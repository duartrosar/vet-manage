"use server";

import { Owner, Pet, User, Vet } from "@prisma/client";
import {
  loginSchema,
  ownerSchema,
  petSchema,
  vetSchema,
} from "../zod/zodSchemas";
import { LoginProps, RegisterProps } from "@/lib/types";
import { hash } from "bcryptjs";
import { db } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "./actions/token-actions";
import { getUserByEmail, getUserById } from "./utils";
import { sendVerificationEmail } from "../mail";

export interface Response {
  owners?: Owner[];
  user?: User;
  pets?: Pet[];
  success: boolean;
}

/****************************************/
/*               Auth                  */
/****************************************/

export async function login(data: LoginProps) {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "Account does not exist" };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      user.password ? true : false,
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
}

export async function logout() {
  await signOut();
}

/****************************************/
/*               Blobs                  */
/****************************************/

export async function deleteBlob(imageUrl: string) {
  const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    },
  });

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: imageUrl.split("/").pop()!,
  });

  await s3Client.send(deleteObjectCommand);
}

/****************************************/
/*               Users                  */
/****************************************/
export async function createUserWithOwner(userRegister: RegisterProps) {
  try {
    const password = await hash(userRegister.password, 12);

    const user = await db.user.create({
      data: {
        name: userRegister.firstName + " " + userRegister.lastName,
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

    const verificationToken = await generateVerificationToken(
      userRegister.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      true,
    );

    return { user: user, success: true };
  } catch (error) {
    console.log("registerCustomerUser", error);
    return { success: false };
  }
}

export async function getUser(email: string) {
  try {
    const user = await db.user.findUnique({
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

export async function deleteUser(userId: string, pathToRevalidate: string) {
  console.log("userId", userId);

  try {
    const user = await getUserById(userId);

    if (user?.image) {
      await deleteBlob(user?.image);
    }

    await db.user.delete({
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
    const owners = await db.owner.findMany();
    return { owners: owners, success: true };
  } catch (error) {
    console.log("getOwners", error);
    return { success: false };
  }
}

export async function getOwner(ownerId: number) {
  try {
    const owner = await db.owner.findUnique({
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
      const ownerUser = await db.user.create({
        data: {
          email: data.email,
          name: data.firstName + " " + data.lastName,
          image: data.imageUrl,
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

      const verificationToken = await generateVerificationToken(data.email);

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

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
      const updatedOwner = await db.owner.update({
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
              name: data.firstName + " " + data.lastName,
              image: data.imageUrl,
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
    const vets = await db.vet.findMany();
    return { vets: vets, success: true };
  } catch (error) {
    console.log("getVets", error);
    return { success: false };
  }
}

export async function getVet(vetId: number) {
  try {
    const vet = await db.vet.findUnique({
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
      const vetUser = await db.user.create({
        data: {
          email: data.email,
          name: data.firstName + " " + data.lastName,
          image: data.imageUrl,
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

      const verificationToken = await generateVerificationToken(data.email);

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      const vet = vetUser.vet;

      revalidatePath("/app/vets");
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
      const updatedvet = await db.vet.update({
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
              name: data.firstName + " " + data.lastName,
              image: data.imageUrl,
            },
          },
        },
      });

      revalidatePath("/app/vets");
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
    const pets = await db.pet.findMany();

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
      const pet = await db.pet.create({
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
      const updatedPet = await db.pet.update({
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
    const pet = await db.pet.findUnique({
      where: { id: petId },
    });

    if (pet?.imageUrl) {
      await deleteBlob(pet.imageUrl);
    }

    await db.pet.delete({
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
