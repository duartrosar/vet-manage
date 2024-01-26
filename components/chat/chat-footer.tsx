import React from "react";
import { IoIosSend } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";

export default function ChatFooter() {
  return (
    <div className="flex h-16 w-full items-center gap-4 border-t-2 border-cerulean-700/25 bg-cerulean-900 px-4">
      <button className="rounded-md p-3 hover:bg-cerulean-800">
        <IoImageOutline className="h-[20px] w-[20px] text-cerulean-600 " />
      </button>
      <div className="w-full">
        <input
          type="text"
          className="w-full border-none bg-transparent font-normal text-white focus:outline-none"
          placeholder="Type a message..."
        />
      </div>
      <button className="rounded-md p-3 hover:bg-cerulean-800">
        <IoIosSend className="h-[20px] w-[20px] text-cerulean-600 " />
      </button>
    </div>
  );
}
