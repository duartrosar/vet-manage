"use client";

import React, { useState } from "react";
import SettingsButton from "./settings-button";
import SettingsDialog from "./settings-dialog";

export default function Settings() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <SettingsButton isDialogOpen={isOpen} setIsDialogOpen={setIsOpen} />
      <SettingsDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="h-screen max-h-screen w-screen max-w-5xl overflow-y-auto border-0 border-cerulean-100/25 bg-cerulean-950 py-12 shadow-lg md:h-full md:w-[90vw] md:overflow-y-hidden md:rounded-lg md:py-0 lg:border-2 landscape:overflow-y-scroll">
          <div className="flex h-96 items-center justify-center text-3xl text-white">
            Settings Dialog
          </div>
        </div>
      </SettingsDialog>
    </>
  );
}
