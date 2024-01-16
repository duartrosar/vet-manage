import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(request: Request) {
  const { imageUrl } = await request.json();
  try {
    const client = new S3Client({
      region: process.env.AWS_S3_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
    });

    const putObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageUrl.split("/").pop()!,
    });

    const result = await client.send(putObjectCommand);

    return Response.json({ result });
  } catch (error) {
    return Response.json({ error });
  }
}
