import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import React from "react";
import { FieldError } from "react-hook-form";

interface SelectProps {
  options?: string[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError | undefined;

  onValueChange?(value: string): void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  // dir?: Direction;
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function ControlledSeletor({
  onValueChange,
  options,
  placeholder,
  value,
  error,
}: SelectProps) {
  return (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <Select onValueChange={onValueChange} defaultValue={value}>
        <FormControl>
          <SelectTrigger
            className={clsx(
              "rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-600",
              error && "border-red-500",
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent
          position="popper"
          className="SelectContent z-50 rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 py-3 text-sm"
        >
          <div className="px-3">
            {options &&
              options.map((value, index) => (
                <SelectItem
                  key={index}
                  value={value}
                  className="cursor-pointer rounded-lg py-2 pr-3 font-semibold text-gray-400 transition hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md"
                >
                  {value}
                </SelectItem>
              ))}
          </div>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}
