import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title:
    "Sandeep Kumar — Strategic Technology Leader | Banking & Payments | AI/ML & Cloud",
  description:
    "Senior Development Manager at Finastra. 14+ years across banking, payments and enterprise software — SWIFT financial messaging, AI/ML and cloud transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-sans antialiased noise`}
      >
        {children}
      </body>
    </html>
  );
}
