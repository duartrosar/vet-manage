import React, { Dispatch } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export default function SettingsDialog({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
      >
        <DialogContent className="flex justify-center" id="panel">
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
