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
    <div className="flex items-center justify-center gap-12 rounded-lg border-2 border-cerulean-200/25 bg-cerulean-900 px-4 py-5 text-cerulean-100 shadow-lg hover:scale-100">
      {type === "success" && <ToastSuccess message={message} />}
      {type === "danger" && <ToastDanger message={message} />}

      <button
        onClick={() => toast.dismiss(t)}
        type="button"
        className="cursor-pointer rounded-lg p-1 text-cerulean-100/50 hover:bg-cerulean-800 hover:text-cerulean-100 hover:shadow-md"
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
      <h2 className="whitespace-nowrap text-cerulean-100/75">{message}</h2>
    </div>
  );
}

function ToastDanger({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2">
      <GoXCircle className="h-4 w-4 text-danger" />
      <h2 className="whitespace-nowrap text-cerulean-100/75">{message}</h2>
    </div>
  );
}

export default Toast;
