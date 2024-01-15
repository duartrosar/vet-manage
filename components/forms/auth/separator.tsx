import React from "react";

export default function Separator() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-full translate-y-1/2 border-b-2 border-cerulean-100/25"></div>
      <span className="text-md text-cerulean-100/25">or</span>
      <div className="w-full translate-y-1/2 border-b-2 border-cerulean-100/25"></div>
    </div>
  );
}
