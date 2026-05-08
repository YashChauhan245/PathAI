"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const preferenceItems = [
  "Email updates",
  "Weekly progress report",
  "Product announcements",
  "Interview reminders",
];

export default function SettingsPage() {
  const [enabled, setEnabled] = useState({
    "Email updates": true,
    "Weekly progress report": true,
    "Product announcements": false,
    "Interview reminders": true,
  });

  const togglePreference = (label) => {
    setEnabled((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <AppShell
      title="Settings"
      subtitle="Manage account preferences and product behavior in one place."
      activePath="/settings"
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">First name</p>
                  <Input placeholder="Yash" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Last name</p>
                  <Input placeholder="Chauhan" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Email</p>
                <Input placeholder="you@example.com" type="email" />
              </div>

              <div className="flex justify-end">
                <Button>Save profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {preferenceItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => togglePreference(item)}
                  className="flex w-full items-center justify-between rounded-xl border border-[#222222] bg-[#0f0f0f] px-4 py-3 text-left transition hover:bg-[#141414]"
                >
                  <span className="text-sm text-zinc-200">{item}</span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      enabled[item] ? "bg-[#22C55E]" : "bg-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                Change password
                <span className="text-zinc-500">Recommended every 90 days</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Sign out all devices
                <span className="text-zinc-500">Last active: 2h ago</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Plan</span>
                <Badge className="border border-[#2a2a2a] bg-[#111111] text-zinc-200">Pro</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Storage usage</span>
                <span className="text-zinc-300">3.1 GB / 10 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Team members</span>
                <span className="text-zinc-300">4</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-400">
              <p>Default output format: Structured checklist</p>
              <p>Default interview mode: Behavioral + technical</p>
              <p>Auto-save drafts: Enabled</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
