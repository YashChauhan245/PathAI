import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import LandingPlanForm from "@/components/landing-plan-form";

export default function LandingPage() {
  return (
    <div className="page-enter">
      <div className="grid-background"></div>

      <HeroSection />

      <section id="features" className="w-full bg-transparent py-14 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-3 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Built for high-signal career execution
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-zinc-400">
            Every module is designed to reduce friction and keep your progress visible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass-card hover-lift"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto text-center">
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <h3 className="text-4xl font-bold text-white">50+</h3>
              <p className="mt-2 text-zinc-400">Industries Covered</p>
            </div>
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <h3 className="text-4xl font-bold text-white">1000+</h3>
              <p className="mt-2 text-zinc-400">Interview Questions</p>
            </div>
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <h3 className="text-4xl font-bold text-white">95%</h3>
              <p className="mt-2 text-zinc-400">Success Rate</p>
            </div>
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <h3 className="text-4xl font-bold text-white">24/7</h3>
              <p className="mt-2 text-zinc-400">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full bg-transparent py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">How It Works</h2>
            <p className="text-zinc-400">
              A four-step flow with predictable next actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover-lift"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1f1f1f] bg-[#111111] text-zinc-200">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            What Our Users Say
          </h2>
          <p className="mb-12 text-center text-zinc-400">
            Trusted by ambitious professionals building their edge with AI.
          </p>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

            <div className="marquee gap-8">
              {[...testimonial, ...testimonial].map((t, index) => (
                <Card
                  key={index}
                  className="min-w-[360px] max-w-[360px] glass-card hover-lift"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            width={48}
                            height={48}
                            src={t.image}
                            alt={t.author}
                            className="rounded-full object-cover border-2 border-[#4F9CF9]/30"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{t.author}</p>
                          <p className="text-sm text-zinc-500">{t.role}</p>
                          <p className="text-sm text-zinc-300">{t.company}</p>
                        </div>
                      </div>

                      <p className="relative leading-relaxed text-zinc-300 italic">
                        <span className="absolute -left-2 -top-4 text-3xl text-zinc-500">
                          &quot;
                        </span>
                        {t.quote}
                        <span className="absolute -bottom-4 text-3xl text-zinc-500">
                          &quot;
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full glass-card rounded-2xl px-6">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="ai-plan" className="w-full py-8 md:py-14">
        <div className="mx-auto max-w-4xl glass-card rounded-3xl p-6 md:p-8">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold md:text-3xl">Get your personalized AI plan</h3>
            <p className="mt-2 text-zinc-400">
              Enter your goals and receive a custom roadmap instantly.
            </p>
          </div>

          <LandingPlanForm />
        </div>
      </section>

      <section className="w-full pb-8">
        <div className="mx-auto rounded-3xl border border-[#1f1f1f] bg-[#0a0a0a] py-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-zinc-300 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button size="lg" className="h-11 mt-5 px-8">
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}