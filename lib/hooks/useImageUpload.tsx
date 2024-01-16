import { auth } from "@/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { useCallback } from "react";

export const useImageUpload = () => {
  const upload = useCallback(async (file: File) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    console.log({ response });

    if (response.ok) {
      const { url, fields } = await response.json();

      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const imageName = fields["key"] as string;

      if (uploadResponse.ok) {
        return {
          ok: uploadResponse.ok,
          url: uploadResponse.url + imageName,
          fields,
        };
      }
    }

    return { ok: false, url: "", fields: "" };
  }, []);

  return { upload };
};

const generateFileName = () => crypto.randomUUID().toString();

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

const maxFileSize = 1024 * 1024 * 10;

async function getSignedURL(
  s3Client: S3Client,
  type: string,
  size: number,
  checksum: string,
) {
  const session = await auth();

  if (!session) {
    return { failure: "Not Authenticated" };
  }

  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxFileSize) {
    return { failure: "File too large" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user?.id ?? "",
    },
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}

export async function checkFileValidity(formData: FormData) {
  //   try {
  //     const file = formData.get("file");
  //     if (!(file instanceof File)) {
  //       return;
  //     }
  //     const checksum = await computeSHA256(file);
  //     const signedUrlResult = await getSignedURL(file.type, file.size, checksum);
  //     if (signedUrlResult.failure !== undefined) return;
  //     const url = signedUrlResult.success?.url;
  //     return url;
  //   } catch (error) {
  //     return;
  //   }
}

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};
