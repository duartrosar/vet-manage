import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/auth-provider";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative bg-cerulean-950`}>
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
