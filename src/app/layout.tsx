import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LoadingProvider } from '@/app/context/LoadingContext';
import "./globals.css";
import LoadingIcon from "@/components/LoadingIcon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WindMap",
  description: "Correlating smart balloon locations with severe weather alerts."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <LoadingIcon />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
