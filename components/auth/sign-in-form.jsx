"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProviders, signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState({});

  useEffect(() => {
    getProviders().then((res) => {
      setProviders(res || {});
    });
  }, []);

  const handleOAuthSignIn = async (providerId) => {
    if (!providers?.[providerId]) {
      toast.error(`${providerId.toUpperCase()} login is not configured yet`);
      return;
    }

    await signIn(providerId, { callbackUrl });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Signed in successfully");
    window.location.href = result?.url || callbackUrl;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={!providers?.google}
          onClick={() => handleOAuthSignIn("google")}
        >
          <span className="text-base">G</span> Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!providers?.github}
          onClick={() => handleOAuthSignIn("github")}
        >
          <Github className="h-4 w-4" /> GitHub
        </Button>
      </div>

      {(!providers?.google || !providers?.github) && (
        <p className="text-xs text-amber-400">
          Google/GitHub login is disabled until OAuth keys are added in .env
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <div className="h-px flex-1 bg-white/10" />
        or continue with email
        <div className="h-px flex-1 bg-white/10" />
      </div>

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
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
