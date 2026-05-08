"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Bot,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PanelLeft,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", href: "/chat", icon: Bot },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Interview", href: "/interview", icon: GraduationCap },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function AppShell({ title, subtitle, activePath, children }) {
  const [collapsed, setCollapsed] = useState(false);

  const mobileNavItems = useMemo(() => navItems.slice(0, 5), []);

  return (
    <div className="pb-20 md:pb-0">
      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
        <aside
          className={cn(
            "sticky top-24 hidden h-[calc(100vh-8rem)] rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-3 md:block",
            collapsed ? "w-[88px]" : "w-[240px]"
          )}
        >
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="mb-4 flex h-10 w-full items-center justify-between rounded-lg border border-[#232323] bg-[#111111] px-3 text-xs text-zinc-300 transition hover:bg-[#161616]"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeft className="h-4 w-4" /> : <span>Collapse</span>}
            {!collapsed && <X className="h-4 w-4" />}
          </button>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = activePath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                    isActive
                      ? "border border-[#2c2c2f] bg-[#111111] text-white"
                      : "text-zinc-400 hover:bg-[#111111] hover:text-zinc-100"
                  )}
                  aria-label={item.label}
                >
                  <ItemIcon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
            {subtitle ? <p className="text-zinc-400">{subtitle}</p> : null}
          </div>
          {children}
        </div>
      </div>

      <nav className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-[#1f1f1f] bg-[#090909] p-2 md:hidden">
        {mobileNavItems.map((item) => {
          const ItemIcon = item.icon;
          const isActive = activePath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl p-2.5 transition",
                isActive ? "bg-[#151515] text-white" : "text-zinc-400"
              )}
              aria-label={item.label}
            >
              <ItemIcon className="h-4 w-4" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
