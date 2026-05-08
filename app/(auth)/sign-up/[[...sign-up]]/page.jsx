import SignUpForm from "@/components/auth/sign-up-form";

export default function Page() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151922]/90 p-7 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
      <p className="text-sm text-slate-400 mb-5">Start using Path AI in less than a minute</p>
      <SignUpForm />
    </div>
  );
}