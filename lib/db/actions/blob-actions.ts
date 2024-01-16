import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

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
