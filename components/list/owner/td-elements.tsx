import React from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

export function TdImage({ imageUrl = null }: { imageUrl: string | null }) {
  return (
    <>
      {imageUrl ? (
        <Image
          className="flex-none rounded-full bg-cerulean-950"
          src={imageUrl}
          width={50}
          height={50}
          alt="Profile picture"
        />
      ) : (
        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
          <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
        </span>
      )}
    </>
  );
}

export function TdText() {
  return <div>td-elements</div>;
}

export function TdDate() {
  return <div>td-elements</div>;
}

export function TdProfile() {
  return <div>td-elements</div>;
}

export const TdComponents = {
  image: TdImage,
  text: TdText,
  date: TdDate,
  profile: TdProfile,
};
