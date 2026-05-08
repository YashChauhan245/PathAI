"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AppShell from "@/components/app-shell";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-[#22C55E]";
      case "medium":
        return "bg-zinc-500";
      case "low":
        return "bg-zinc-600";
      default:
        return "bg-zinc-600";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-[#22C55E]" };
      case "neutral":
        return { icon: LineChart, color: "text-zinc-300" };
      case "negative":
        return { icon: TrendingDown, color: "text-zinc-500" };
      default:
        return { icon: LineChart, color: "text-zinc-500" };
    }
  };

  const marketOutlookInfo = getMarketOutlookInfo(insights.marketOutlook);
  const OutlookIcon = marketOutlookInfo.icon;
  const outlookColor = marketOutlookInfo.color;

  // Format dates using date-fns
  const [lastUpdatedDate, setLastUpdatedDate] = useState("--/--/----");
  const [nextUpdateDistance, setNextUpdateDistance] = useState("soon");

  useEffect(() => {
    setLastUpdatedDate(format(new Date(insights.lastUpdated), "dd/MM/yyyy"));
    setNextUpdateDistance(
      formatDistanceToNow(new Date(insights.nextUpdate), {
        addSuffix: true,
      })
    );
  }, [insights.lastUpdated, insights.nextUpdate]);

  return (
    <AppShell
      title="Dashboard"
      subtitle="Industry signals, growth snapshots, and execution-ready recommendations."
      activePath="/dashboard"
    >
      <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <Badge variant="outline" className="border-[#262626] bg-[#0d0d0d] text-zinc-300">
              Last updated: {lastUpdatedDate}
            </Badge>
            <div className="flex items-center gap-2">
              <Link href="/chat" className="text-xs text-zinc-400 transition hover:text-white">
                AI assistant
              </Link>
              <Sparkles className="h-4 w-4 text-zinc-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
                <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold gradient-title">{insights.marketOutlook}</div>
                <p className="text-xs text-slate-400">Next update {nextUpdateDistance}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-zinc-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{insights.growthRate.toFixed(1)}%</div>
                <Progress value={insights.growthRate} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
                <BriefcaseIcon className="h-4 w-4 text-slate-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{insights.demandLevel}</div>
                <div
                  className={`h-2 w-full rounded-full mt-3 ${getDemandLevelColor(
                    insights.demandLevel
                  )}`}
                />
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
                <Brain className="h-4 w-4 text-zinc-300" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {insights.topSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-[#151515] text-zinc-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-4 hover-lift">
            <CardHeader>
              <CardTitle>Salary Ranges by Role</CardTitle>
              <CardDescription>
                Minimum, median, and maximum salaries in thousands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-xl border border-[#27272a] bg-[#090909] p-3">
                              <p className="mb-1 text-sm font-medium text-white">{label}</p>
                              {payload.map((item) => (
                                <p key={item.name} className="text-xs text-zinc-300">
                                  {item.name}: ${item.value}K
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="min" fill="#52525b" radius={[8, 8, 0, 0]} name="Min (K)" />
                    <Bar dataKey="median" fill="#71717a" radius={[8, 8, 0, 0]} name="Median (K)" />
                    <Bar dataKey="max" fill="#a1a1aa" radius={[8, 8, 0, 0]} name="Max (K)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-zinc-300" />
                  Key Industry Trends
                </CardTitle>
                <CardDescription>Live indicators shaping your next move</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {insights.keyTrends.map((trend, index) => (
                    <li key={index} className="flex items-start gap-2 text-zinc-200">
                      <div className="mt-2 h-2 w-2 rounded-full bg-zinc-500" />
                      <span>{trend}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Recommended Skills</CardTitle>
                <CardDescription>Focus these for accelerated growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {insights.recommendedSkills.map((skill, index) => (
                    <Badge
                      key={`${skill}-${index}`}
                      variant="outline"
                      className="border-[#2a2a2a] bg-[#101010] text-zinc-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </AppShell>
  );
};

export default DashboardView;