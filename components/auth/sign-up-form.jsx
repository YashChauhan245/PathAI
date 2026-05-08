"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProviders, signIn } from "next-auth/react";
import { toast } from "sonner";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";

export default function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState({});

  useEffect(() => {
    getProviders().then((res) => {
      setProviders(res || {});
    });
  }, []);

  const handleOAuthSignUp = async (providerId) => {
    if (!providers?.[providerId]) {
      toast.error(`${providerId.toUpperCase()} signup is not configured yet`);
      return;
    }

    await signIn(providerId, { callbackUrl: "/onboarding" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: "/onboarding",
      });

      if (result?.error) {
        toast.success("Account created. Please sign in.");
        window.location.href = "/sign-in";
        return;
      }

      toast.success("Account created successfully");
      window.location.href = result?.url || "/onboarding";
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={!providers?.google}
          onClick={() => handleOAuthSignUp("google")}
        >
          <span className="text-base">G</span> Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!providers?.github}
          onClick={() => handleOAuthSignUp("github")}
        >
          <Github className="h-4 w-4" /> GitHub
        </Button>
      </div>

      {(!providers?.google || !providers?.github) && (
        <p className="text-xs text-amber-400">
          Google/GitHub signup is disabled until OAuth keys are added in .env
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <div className="h-px flex-1 bg-white/10" />
        or create account with email
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <Input
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
      <p className="text-sm text-slate-400 text-center">
        Already have an account? <Link href="/sign-in" className="text-[#7cc7ff]">Sign in</Link>
      </p>
    </form>
  );
}
