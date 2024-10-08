"use client";

import { FaCopy } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "sonner";
import Toast from "../toast/toasters";
import { MdOutlineLaunch } from "react-icons/md";

export default function DashboardEntitiesDisplay({
  amount,
  title,
  urlPath,
}: {
  amount: number;
  title: string;
  urlPath: string;
}) {
  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.custom((t) => (
        <Toast t={t} message="Copied to clipboard" type="success" />
      ));
    } catch (err) {
      toast.custom((t) => (
        <Toast t={t} message="Could not copy to clipboard" type="danger" />
      ));
    }
  }

  return (
    <div
      className="flex
       h-full flex-col justify-between gap-4 p-2 py-4"
    >
      <div className="space-y-2 px-2">
        <div className="flex items-center">
          <p className="text-md text-gray-800 dark:text-gray-200">
            {amount} {title}
          </p>
          <button
            className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => copyToClipboard(amount + "")}
          >
            <FaCopy className="w-3 " />
          </button>
        </div>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          There are currently {amount} {title} in your clinic.
        </p>
      </div>
      <Link
        href={urlPath}
        target="_blank"
        className="group flex gap-1 self-start whitespace-nowrap p-2 text-xs text-cerulean-500 transition hover:rounded-md hover:bg-gray-100 dark:text-cerulean-400 dark:hover:bg-cerulean-800 dark:hover:text-cerulean-200"
      >
        Manage {title.toLowerCase()}{" "}
        <MdOutlineLaunch className="w-3 dark:text-gray-200 dark:group-hover:text-cerulean-200" />
      </Link>
    </div>
  );
}
