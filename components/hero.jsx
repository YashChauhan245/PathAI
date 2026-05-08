"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, WandSparkles } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (!imageElement) {
        return;
      }

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full pb-12 pt-28 md:pb-16 md:pt-36">
      <div className="ambient-orb left-6 top-24 h-28 w-28 bg-white/20" />

      <div className="space-y-8 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#1f1f1f] bg-[#0a0a0a] px-4 py-2 text-xs text-zinc-400">
          Built for focused career execution
        </div>

        <div className="space-y-6 mx-auto">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="gradient-title">Path AI for modern career teams</span>
            <br />
            <span className="text-white">built with clarity, not noise</span>
          </h1>
          <p className="mx-auto max-w-[680px] text-zinc-400 md:text-lg">
            Manage resume updates, interview prep, and hiring-market insights in a
            single workspace designed for daily decision making.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/chat">
            <Button size="lg" variant="outline" className="px-8">
              Ask Path AI <WandSparkles className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 text-sm text-zinc-300 md:grid-cols-3">
          <div className="glass-card rounded-xl p-3">Resume and cover letter workflows</div>
          <div className="glass-card rounded-xl p-3">Structured mock interviews</div>
          <div className="glass-card rounded-xl p-3">Actionable market trend snapshots</div>
        </div>

        <div className="hero-image-wrapper mt-6 md:mt-2 px-4">
          <div ref={imageRef} className="hero-image glass-card mx-auto max-w-6xl rounded-2xl p-2">
            <Image
              src="/banner.jpeg"
              width={1100}
              height={600}
              alt="Dashboard Preview"
              className="mx-auto rounded-xl border border-[#1f1f1f]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;