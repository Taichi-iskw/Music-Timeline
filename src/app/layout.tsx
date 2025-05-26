import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DndProvider from "@/components/providers/DndProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Timeline",
  description: "Visualize your favorite artists' discography timeline",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container py-16 sm:py-20">
              <DndProvider>{children}</DndProvider>
            </main>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
