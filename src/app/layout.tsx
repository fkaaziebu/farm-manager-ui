"use client";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";
import { apolloClient } from "@/config";
import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/admin/login");
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
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
