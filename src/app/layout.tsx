import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "tw-min-h-screen tw-bg-background tw-font-sans tw-antialiased tw-text-black",
          fontSans.variable
        )}
      >
        <main className="tw-container tw-px-12">{children}</main>
        {modal}
        <Toaster />
      </body>
    </html>
  );
}
