"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";

export default function LandingPlanForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    careerTarget: "",
    email: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.careerTarget || !form.email) {
      toast.error("Please fill all fields before generating your AI plan.");
      return;
    }

    localStorage.setItem("pathAiPlanDraft", JSON.stringify(form));
    toast.success("Plan details saved. Complete onboarding to generate your AI plan.");
    router.push("/onboarding");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <FloatingInput
        id="fullName"
        label="Full Name"
        value={form.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
      />
      <FloatingInput
        id="careerTarget"
        label="Career Target"
        value={form.careerTarget}
        onChange={(e) => handleChange("careerTarget", e.target.value)}
      />
      <FloatingInput
        id="email"
        type="email"
        label="Work Email"
        className="md:col-span-2"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <Button type="submit" className="md:col-span-2" size="lg">
        Generate My Path AI Plan
      </Button>
    </form>
  );
}
