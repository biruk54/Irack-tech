import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "iRack IT Solutions — Smart Solutions, Stronger Future",
  description:
    "iRack IT Solutions is a trusted technology solutions provider in Ethiopia since 2014 G.C. — delivering turnkey data center & power, enterprise networking, cyber security, cloud, smart infrastructure and software solutions for government, BFSI and telecom clients.",
  keywords: [
    "iRack IT Solutions",
    "IT solutions Ethiopia",
    "Addis Ababa IT company",
    "data center Ethiopia",
    "enterprise networking",
    "cyber security Ethiopia",
    "cloud solutions",
    "smart infrastructure",
    "software development Ethiopia",
    "turnkey IT solutions",
  ],
  authors: [{ name: "iRack IT Solutions" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "iRack IT Solutions",
    description:
      "Smart solutions, stronger future. High-quality, value-added IT solutions from Addis Ababa, Ethiopia since 2014 G.C.",
    siteName: "iRack IT Solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
