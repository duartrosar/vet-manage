import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from "react-icons/io5";
import { GoXCircle } from "react-icons/go";
import { toast } from "sonner";

interface Toaster {
  t: string | number;
  message: string;
  type: "success" | "danger" | "warning";
}

function Toast({ t, message, type }: Toaster) {
  return (
    <div className="z-[100] flex items-center justify-center gap-12 rounded-lg border-2 border-cerulean-700/25 bg-gray-100 px-4 py-5 shadow-lg hover:scale-100 dark:border-cerulean-200/25 dark:bg-cerulean-900">
      {type === "success" && <ToastSuccess message={message} />}
      {type === "danger" && <ToastDanger message={message} />}

      <button
        onClick={() => toast.dismiss(t)}
        type="button"
        className="cursor-pointer rounded-lg p-1 text-gray-600 hover:bg-gray-300 hover:shadow-md dark:text-cerulean-100/50 dark:hover:bg-cerulean-800 dark:hover:text-cerulean-100"
      >
        <IoMdClose className="h-4 w-4" />
      </button>
    </div>
  );
}

function ToastSuccess({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2">
      <IoCheckmarkCircleOutline className="h-4 w-4 text-success" />
      <h2 className="whitespace-nowrap text-gray-800 dark:text-cerulean-100/75">
        {message}
      </h2>
    </div>
  );
}

function ToastDanger({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2">
      <GoXCircle className="h-4 w-4 text-danger" />
      <h2 className="whitespace-nowrap text-gray-800 dark:text-cerulean-100/75">
        {message}
      </h2>
    </div>
  );
}

export default Toast;
