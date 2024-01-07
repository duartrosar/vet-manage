import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Owner } from "@prisma/client";
import clsx from "clsx";
import React from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface TextInputProps extends InputProps {
  label: string;
  error: FieldError | undefined;
}

export default function TextInput({ label, error, ...props }: TextInputProps) {
  return (
    <FormItem className="relative">
      <FormLabel className="pl-3 text-sm font-bold text-gray-500">
        {label}
      </FormLabel>
      <FormControl>
        <Input
          className={clsx(
            "rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-600",
            error && "border-red-500",
          )}
          {...props}
        />
      </FormControl>
      <FormMessage className="absolute -bottom-1 right-0 translate-y-full pr-3 text-right text-xs font-bold text-red-500" />
    </FormItem>
  );
}
