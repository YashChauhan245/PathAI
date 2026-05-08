import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { auth, signOut } from "@/auth";

export default async function Header() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#1a1a1a] bg-black/95 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" prefetch>
          <div className="flex items-center gap-2">
            <Image
              src={"/logo0.png"}
              alt="PathAI Logo"
              width={160}
              height={40}
              className="h-10 w-[150px] object-cover object-center"
              priority
            />
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-zinc-400 lg:flex">
          {!isLoggedIn && (
            <>
              <Link href="/#features" className="transition-colors hover:text-white">
                Features
              </Link>
              <Link href="/#how-it-works" className="transition-colors hover:text-white">
                How It Works
              </Link>
              <Link href="/#faq" className="transition-colors hover:text-white">
                FAQ
              </Link>
              <Link href="/#ai-plan" className="transition-colors hover:text-white">
                AI Plan
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link href="/dashboard" prefetch className="transition-colors hover:text-white">
                Overview
              </Link>
              <Link href="/resume" prefetch className="transition-colors hover:text-white">
                Resume
              </Link>
              <Link href="/interview" prefetch className="transition-colors hover:text-white">
                Interview
              </Link>
              <Link href="/chat" prefetch className="flex items-center gap-1.5 transition-colors hover:text-white">
                <MessageSquare className="h-3.5 w-3.5" />
                AI Chat
              </Link>
              <Link href="/settings" prefetch className="transition-colors hover:text-white">
                Settings
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {isLoggedIn && (
            <>
            <Link href="/dashboard" prefetch>
              <Button
                variant="outline"
                className="hidden items-center gap-2 md:inline-flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 border-[#1f1f1f] bg-[#0a0a0a]">
                <DropdownMenuItem asChild>
                  <Link href="/resume" prefetch className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    prefetch
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" prefetch className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/chat" prefetch className="flex items-center gap-2">
                    <StarsIcon className="h-4 w-4" />
                    Path AI Chat
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link href="/sign-in" prefetch>
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/sign-up" prefetch className="hidden md:block">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button type="submit" variant="outline">Sign Out</Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}