"use client";

import React, { useState } from "react";
import SettingsButton from "./settings-button";
import SettingsDialog from "./settings-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UserDisplay from "../user/user-display";
import ChangePasswordForm from "./change-password/change-password";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import OwnerForm from "../forms/owner/owner-form";

export default function Settings() {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!user) {
    // return some error or toast
    return <></>;
  }

  return (
    <>
      <SettingsButton isDialogOpen={isOpen} setIsDialogOpen={setIsOpen} />
      <SettingsDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="landscape:overflow-y-scrol h-screen max-h-screen w-screen max-w-5xl overflow-y-hidden border-0 border-cerulean-100/25 bg-cerulean-950 py-12 shadow-lg md:h-full md:w-[90vw] md:overflow-y-hidden md:rounded-lg md:py-0 lg:border-2">
          <div className="flex h-full w-full items-center justify-center text-3xl text-white md:h-[600px]">
            <Tabs
              defaultValue="account"
              className="flex h-full w-full p-0"
              orientation="horizontal"
            >
              <TabsList className="flex h-full flex-col items-start justify-start space-y-2 whitespace-nowrap border-r-2 border-cerulean-700/25 p-2 text-gray-400">
                <UserDisplay className="mb-4" />
                <TabsTrigger className="w-full justify-start" value="profile">
                  Profile
                </TabsTrigger>
                <TabsTrigger className="w-full justify-start" value="email">
                  Email
                </TabsTrigger>
                <TabsTrigger className="w-full justify-start" value="password">
                  Password
                </TabsTrigger>
                <TabsTrigger className="w-full justify-start" value="roles">
                  Roles & Permissions
                </TabsTrigger>
              </TabsList>
              <div className="w-full bg-cerulean-900">
                <TabsContent className="h-full" value="profile">
                  <div className="flex h-full items-center justify-center overflow-y-auto">
                    <OwnerForm />
                  </div>
                </TabsContent>
                <TabsContent className="h-full" value="email">
                  <div className="flex h-full items-center justify-center overflow-y-auto">
                    Change your email here.
                  </div>
                </TabsContent>
                <TabsContent className="h-full" value="password">
                  <div className="flex h-full flex-col items-center justify-center overflow-y-auto px-44">
                    <h2 className="w-full text-left text-lg font-medium tracking-wide text-gray-200">
                      Change Your Password
                    </h2>
                    <ChangePasswordForm user={user} />
                  </div>
                </TabsContent>
                <TabsContent className="h-full" value="roles">
                  <div className="flex h-full items-center justify-center overflow-y-auto">
                    Change the user's roles and permissions here.
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </SettingsDialog>
    </>
  );
}
