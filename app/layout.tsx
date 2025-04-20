import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DarkNavigation from "@/components/layout/Navigation";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oru - Digital Wellbeing",
  description: "Track and manage your digital distractions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <DarkNavigation />
          <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}