import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldError } from "react-hook-form";

interface TextAreaInputProps extends TextareaProps {
  label: string;
  error?: FieldError | undefined;
}

const ControlledTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(({ label, error, className, ...props }, ref) => {
  return (
    <FormItem className="relative gap-1 space-y-0">
      <FormLabel className="pl-3 text-sm font-bold text-gray-500">
        {label}
      </FormLabel>
      <FormControl>
        <Textarea
          className={cn(
            "rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-600",
            error &&
              "border-red-500 focus:border-red-500 focus-visible:ring-red-500",
            className,
          )}
          ref={ref}
          {...props}
        />
      </FormControl>
      <FormMessage className="absolute right-0 top-1 pr-3 text-right text-[10px] font-bold text-red-500" />
    </FormItem>
  );
});

export default ControlledTextArea;
