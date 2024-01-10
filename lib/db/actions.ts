"use server";

import { Owner, Pet, PrismaClient, User, Vet } from "@prisma/client";
import { ownerSchema, petSchema, vetSchema } from "../zod/zodSchemas";
import { RegisterProps } from "../types";
import { hash } from "bcrypt";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { options } from "../auth/options";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cryto from "crypto";
import { computeSHA256 } from "../utils";

export interface Response {
  owners?: Owner[];
  user?: User;
  pets?: Pet[];
  success: boolean;
}

/****************************************/
/*               Blobs                  */
/****************************************/

const generateFileName = () => crypto.randomUUID().toString();

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

const maxFileSize = 1024 * 1024 * 10;

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string,
) {
  const session = await getServerSession(options);

  if (!session) {
    return { failure: "Not Authenticated" };
  }

  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxFileSize) {
    return { failure: "File too large" };
  }

  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user.id,
    },
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}

export async function blobUpload(formData: FormData) {
  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return;
    }

    const checksum = await computeSHA256(file);

    const signedUrlResult = await getSignedURL(file.type, file.size, checksum);

    if (signedUrlResult.failure !== undefined) return;

    const url = signedUrlResult.success?.url;

    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    return url.split("?")[0];
  } catch (error) {
    return;
  }
}

export async function blobDelete(imageUrl: string) {
  const putObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: imageUrl.split("/").pop()!,
  });

  await s3Client.send(putObjectCommand);
}

/****************************************/
/*               Users                  */
/****************************************/
export async function createUserWithOwner(userRegister: RegisterProps) {
  try {
    const password = await hash(userRegister.password, 12);

    const user = await prisma.user.create({
      data: {
        firstName: userRegister.firstName,
        lastName: userRegister.lastName,
        email: userRegister.email,
        password: password,
        isActive: true,
        hasEntity: true,
        roles: {
          create: { role: "CUSTOMER" },
        },
        owner: {
          create: {
            firstName: userRegister.firstName,
            lastName: userRegister.lastName,
            email: userRegister.email,
          },
        },
      },
    });

    return { user: user, success: true };
  } catch (error) {
    console.log("registerCustomerUser", error);
    return { success: false };
  }
}

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return { user, success: true };
  } catch (error) {
    console.log("getUser", error);
    return { success: false };
  }
}

export async function deleteUser(userId: number, pathToRevalidate: string) {
  console.log("userId", userId);

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.log("deleteUser", error);
    return { success: false };
  }
}

/****************************************/
/*               Onwers                 */
/****************************************/
export async function getOwners(): Promise<Response> {
  try {
    const owners = await prisma.owner.findMany();
    return { owners: owners, success: true };
  } catch (error) {
    console.log("getOwners", error);
    return { success: false };
  }
}

export async function getOwner(ownerId: number) {
  try {
    const owner = await prisma.owner.findUnique({
      where: {
        id: ownerId,
      },
    });

    return { owner };
  } catch (error) {
    console.log("getOwner", error);
    return { error };
  }
}

export async function createOwnerWithUser(data: Owner) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const password = await hash("", 12);

      const ownerUser = await prisma.user.create({
        data: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          imageUrl: data.imageUrl,
          password: password,
          hasEntity: true,
          roles: {
            create: { role: "CUSTOMER" },
          },
          owner: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              dateOfBirth: data.dateOfBirth,
              gender: data.gender,
              email: data.email,
              mobileNumber: data.mobileNumber,
              address: data.address,
              imageUrl: data.imageUrl,
            },
          },
        },
        include: { owner: true },
      });

      const owner = ownerUser.owner;

      revalidatePath("/app/owners");
      return { ownerUser, success: true, owner };
    }

    console.log(result.error.format());
    return { ownerUser: data, success: false };
  } catch (error) {
    console.log("createOwnerWithUser", error);
    return { success: false };
  }
}

export async function updateOwner(data: Owner, ownerId: number) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const updatedOwner = await prisma.owner.update({
        where: {
          id: ownerId,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          email: data.email,
          mobileNumber: data.mobileNumber,
          address: data.address,
          imageUrl: data.imageUrl,
          user: {
            update: {
              firstName: data.firstName,
              lastName: data.lastName,
              imageUrl: data.imageUrl,
            },
          },
        },
      });

      revalidatePath("/app/owners");
      return {
        updatedOwner,
        success: true,
        message: "Owner was updated sucessfully",
      };
    }
    console.log(result.error.format());
    return {
      updatedOwner: data,
      success: false,
      message: "An error ocurred atempting to create the owner",
    };
  } catch (error) {
    console.log("updateOwner", error);
  }
}

/****************************************/
/*                Vets                  */
/****************************************/
export async function getVets() {
  try {
    const vets = await prisma.vet.findMany();
    return { vets: vets, success: true };
  } catch (error) {
    console.log("getVets", error);
    return { success: false };
  }
}

export async function getVet(vetId: number) {
  try {
    const vet = await prisma.vet.findUnique({
      where: {
        id: vetId,
      },
    });

    return { vet };
  } catch (error) {
    console.log("getVet", error);
    return { error };
  }
}

export async function createVetWithUser(data: Vet) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const password = await hash("", 12);

      const vetUser = await prisma.user.create({
        data: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          imageUrl: data.imageUrl,
          password: password,
          hasEntity: true,
          roles: {
            create: { role: "EMPLOYEE" },
          },
          vet: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              dateOfBirth: data.dateOfBirth,
              gender: data.gender,
              email: data.email,
              mobileNumber: data.mobileNumber,
              address: data.address,
              imageUrl: data.imageUrl,
            },
          },
        },
        include: { vet: true },
      });

      const vet = vetUser.vet;

      revalidatePath("/app/pets");
      return { vetUser, success: true, vet };
    }

    console.log(result.error.format());
    return { vetUser: data, success: false };
  } catch (error) {
    console.log("createVetWithUser", error);
    return { success: false };
  }
}

export async function updateVet(data: Vet, vetId: number) {
  try {
    const result = vetSchema.safeParse(data);

    if (result.success) {
      const updatedvet = await prisma.vet.update({
        where: {
          id: vetId,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          email: data.email,
          mobileNumber: data.mobileNumber,
          address: data.address,
          imageUrl: data.imageUrl,
          user: {
            update: {
              firstName: data.firstName,
              lastName: data.lastName,
              imageUrl: data.imageUrl,
            },
          },
        },
      });

      revalidatePath("/app/pets");
      return {
        updatedvet,
        success: true,
        message: "Vet was updated sucessfully",
      };
    }
    console.log(result.error.format());
    return {
      updatedvet: data,
      success: false,
      message: "An error ocurred atempting to create the Vet",
    };
  } catch (error) {
    console.log("updateVet", error);
  }
}

/****************************************/
/*                Pets                  */
/****************************************/
export async function getPets() {
  try {
    const pets = await prisma.pet.findMany();

    return { pets: pets, success: true };
  } catch (error) {
    console.log("getPets", error);
    return { success: false };
  }
}

export async function createPet(data: Pet) {
  try {
    const result = petSchema.safeParse(data);

    if (result.success) {
      const pet = await prisma.pet.create({
        data: data,
      });

      if (pet) {
        revalidatePath("/app/pets");
        return { pet, success: true };
      }
    }

    return { pet: data, success: false };
  } catch (error) {
    console.log("createPet", error);
    return { success: false };
  }
}

export async function updatePet(data: Pet) {
  try {
    const result = petSchema.safeParse(data);

    if (result) {
      const updatedPet = await prisma.pet.update({
        where: {
          id: data.id,
        },
        data: data,
      });

      revalidatePath("/app/pets");
      return { updatedPet, success: true };
    }

    return { updatedPet: data, success: false };
  } catch (error) {
    console.log("updatePet", error);
    return { success: false };
  }
}

export async function deletePet(petId: number) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
    revalidatePath("/app/pets");
  } catch (error) {
    console.log("deletePet", error);
    return { success: false };
  }
}
