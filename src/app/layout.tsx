"use client";
import { Toaster } from "@/components/ui/sonner";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";
import { apolloClient } from "@/config";
import { ApolloProvider } from "@apollo/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={apolloClient}>
          {children}
          <ModalProvider />
          <Toaster />
        </ApolloProvider>
      </body>
    </html>
  );
}
