"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, Send, FileText, ArrowRight } from "lucide-react";
import AppShell from "@/components/app-shell";

const starterMessages = [
  {
    role: "user",
    content: "Build me a 30-day roadmap for transitioning into product analytics.",
  },
  {
    role: "assistant",
    content:
      "### 30-Day Transition Plan\n- **Week 1:** SQL + metrics fundamentals\n- **Week 2:** Product analytics case studies\n- **Week 3:** Build 2 portfolio projects\n- **Week 4:** Interview prep + resume alignment\n\n```sql\nSELECT metric_name, value\nFROM weekly_metrics\nORDER BY week DESC;\n```\n\nWant me to convert this into a daily checklist?",
  },
];

export default function PathAIChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = useMemo(
    () => [
      "Create my interview prep plan",
      "Analyze my resume gaps",
      "Suggest high-impact skills",
      "Generate cover letter bullets",
    ],
    []
  );

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const promptText = message.trim();
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `### Suggested Next Step\nI can help with: **${promptText}**.\n\n- Break it into a weekly roadmap\n- Prioritize by impact\n- Generate ready-to-use outputs\n\nTell me your timeline and I will tailor this for you.`,
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <AppShell
      title="Path AI Chat"
      subtitle="Ask precise questions and get practical, action-ready guidance."
      activePath="/chat"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge className="border border-[#262626] bg-[#0d0d0d] text-zinc-300">
            <Sparkles className="mr-1 h-3.5 w-3.5" /> AI Interaction
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card className="min-h-[560px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-zinc-300" />
              Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    item.role === "assistant"
                      ? "border border-[#252525] bg-[#0f0f0f]"
                      : "ml-auto border border-[#2c2c2c] bg-[#171717]"
                  }`}
                >
                  <div className="chat-markdown whitespace-pre-wrap">{item.content}</div>
                </div>
              ))}

              {isTyping && (
                <div className="max-w-[220px] rounded-2xl border border-[#252525] bg-[#0f0f0f] px-4 py-3">
                  <div className="typing-dots flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-zinc-400" />
                    <span className="h-2 w-2 rounded-full bg-zinc-400" />
                    <span className="h-2 w-2 rounded-full bg-zinc-400" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.12em] text-zinc-500">Ask Path AI</label>
              <div className="flex items-center gap-2 rounded-2xl border border-[#242424] bg-[#0b0b0b] p-2 transition focus-within:neon-border">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask for roadmap, resume improvements, interview strategy..."
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <Button onClick={handleSend} size="icon" aria-label="Send message">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setMessage(prompt)}
                  className="w-full rounded-xl border border-[#252525] bg-[#101010] px-3 py-2 text-left text-sm text-zinc-200 transition hover:bg-[#151515]"
                >
                  {prompt}
                </button>
              ))}
            </CardContent>
          </Card>

            <Card className="loading-shimmer">
            <CardHeader>
              <CardTitle className="text-base">Live Context Loader</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300">
              <p>Preparing your profile signals...</p>
              <p>Scanning role fit and market demand...</p>
              <p>Generating action items for this week...</p>
            </CardContent>
          </Card>

            <Card>
            <CardContent className="pt-6 space-y-2">
              <p className="text-sm text-zinc-400">Need structured outputs?</p>
              <Link href="/resume">
                <Button variant="outline" className="w-full justify-between">
                  Open Resume Builder
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/ai-cover-letter">
                <Button variant="outline" className="w-full justify-between">
                  Open Cover Letter AI
                  <FileText className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
