import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-16 bg-cerulean-950 border border-cerulean-800 rounded-lg shadow-lg">
        <Link
          href="/app"
          className="text-3xl text-cerulean-500 hover:opacity-80 hover:scale-110"
        >
          GO TO APP
        </Link>
      </div>
    </div>
  );
}
