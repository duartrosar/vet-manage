import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/auth-provider";
import { Toaster } from "sonner";
import { Suspense } from "react";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "vetwise",
  description: "For your pets, by your pets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative bg-slate-100 dark:bg-cerulean-950`}
      >
        <Toaster
          closeButton
          expand
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "absolute right-0 z-[100]",
              closeButton: "fixed right-0 top-0",
            },
          }}
          duration={200000}
        />
        <AuthProvider>
          <Suspense>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
