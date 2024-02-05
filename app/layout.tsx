import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

const fontRegularSans = localFont({
  src: "../assets/fonts/Inter-Regular.ttf",
  variable: "--font-sans",
});

const fontBoldSans = localFont({
  src: "../assets/fonts/Inter-Regular.ttf",
  variable: "--font-BoldSans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Study Buddy AI",
  description: "Your AI study partner",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen font-sans_regular antialiased",
          fontRegularSans.variable,
          fontBoldSans.variable,
          fontHeading.variable
        )}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
