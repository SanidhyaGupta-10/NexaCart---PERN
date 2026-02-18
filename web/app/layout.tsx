import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./components/providers";
import "./globals.css";
import Navbar from "./components/Navbar";
import AppClient from "./components/AppClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexaCart - PERN Stack Ecommerce",
  description: "PostgreSQL + Express + React + Node + Bun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <AppClient>
              <Navbar />
              {children}
            </AppClient>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
