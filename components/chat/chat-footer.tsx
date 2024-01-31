"use client";

import React from "react";
import { IoIosSend } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { Form, FormField } from "../ui/form";
import { FieldValues, useForm } from "react-hook-form";
import useConversation from "@/lib/hooks/useConversation";
import { Message } from "@prisma/client";
import { createMessage } from "@/lib/db/actions/chat-actions";

interface MessageFormData {
  conversationId?: number;
  body?: string;
}

export default function ChatFooter() {
  const { conversationId } = useConversation();
  const form = useForm<MessageFormData>({
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = async (data: MessageFormData) => {
    form.setValue("body", "");

    data.conversationId = conversationId;

    const message = await createMessage(data as Message);

    console.log({ message });
  };

  return (
    <div className="flex h-16 w-full items-center gap-4 border-t-2 border-cerulean-700/25 bg-cerulean-900 px-4">
      <button className="rounded-md p-3 hover:bg-cerulean-800">
        <IoImageOutline className="h-[20px] w-[20px] text-cerulean-600 " />
      </button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full items-center"
        >
          <div className="w-full">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full border-none bg-transparent font-normal text-white focus:outline-none"
                  placeholder="Type a message..."
                />
              )}
            />
          </div>
          <button className="rounded-md p-3 hover:bg-cerulean-800">
            <IoIosSend className="h-[20px] w-[20px] text-cerulean-600 " />
          </button>
        </form>
      </Form>
    </div>
  );
}
