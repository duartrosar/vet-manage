import React, { forwardRef } from "react";

const DropDownList = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        className="absolute left-0 top-20 w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900"
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

export default DropDownList;
