import { getSignedURL } from "@/lib/db/actions";
import { computeSHA256 } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const checksum = await computeSHA256(file);
    const signedUrlResult = await getSignedURL(file.type, file.size, checksum);
    if (signedUrlResult.failure !== undefined) return;
    const url = signedUrlResult.success?.url;

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (response.ok) {
      return NextResponse.json({ success: true, url: url.split("?")[0] });
    }

    return NextResponse.json(
      { error: "Error uploading file", success: false },
      { status: 400 },
    );
    // return url.split("?")[0];
  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" });
  }
}
