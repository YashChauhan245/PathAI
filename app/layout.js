import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import AuthSessionProvider from "@/components/auth/session-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Path AI",
  description: "Path AI is an intelligent career guidance platform offering AI-powered mock interviews, resume building, and real-time job market insights to help users prepare for and succeed in their careers.",
  icons: {
    icon: "/logo0.png",
    shortcut: "/logo0.png",
    apple: "/logo0.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} relative`}>
        <AuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors position="top-right" />

            <footer className="border-t border-[#1a1a1a] bg-black py-8">
              <div className="container mx-auto px-4 text-center text-zinc-400">
                <p className="text-sm">Made By Yash Chauhan</p>
              </div>
            </footer>
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}