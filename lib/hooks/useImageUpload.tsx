import { useCallback } from "react";

const generateFileName = () => crypto.randomUUID().toString();

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

export const useImageUpload = () => {
  const upload = useCallback(async (file: File) => {
    const response = await fetch("/api/blob/upload", {
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

  const deleteImage = useCallback(async (imageUrl: string) => {
    const response = await fetch("/api/blob/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: imageUrl }),
    });

    console.log({ response });
  }, []);

  return { upload, deleteImage };
};
