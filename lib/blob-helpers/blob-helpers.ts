import { checkFileValidity } from "@/lib/db/actions";

export async function uploadBlob(file: File) {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const url = await checkFileValidity(formData);

    if (!url) return { url, success: false };

    const result = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    return { url: result.url.split("?")[0], success: true };
  } catch (error) {}
}
