"use client";

import { cn } from "@/lib/utils";

export function FloatingInput({ id, label, className, ...props }) {
  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        placeholder=" "
        className="peer h-12 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 pt-5 text-sm text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] outline-none transition duration-300 focus:border-[#4F9CF9]/60 focus:ring-2 focus:ring-[#4F9CF9]/35"
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-3 origin-left text-xs tracking-[0.09em] uppercase text-slate-400 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[11px] peer-focus:top-3 peer-focus:translate-y-0"
      >
        {label}
      </label>
    </div>
  );
}
