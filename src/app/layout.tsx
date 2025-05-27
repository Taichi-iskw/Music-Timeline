import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import DndProvider from "@/components/providers/DndProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
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
  description: "Create your own music timeline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Theme initialization
                const savedTheme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = savedTheme || systemTheme;
                document.documentElement.classList.add(theme);
              } catch (e) {
                console.error('Failed to set initial settings:', e);
              }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 container py-4 sm:py-6">
                <DndProvider>{children}</DndProvider>
              </main>
              <div className="mt-auto">
                <Footer />
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
