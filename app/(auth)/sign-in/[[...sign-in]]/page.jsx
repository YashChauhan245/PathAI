import SignInForm from "@/components/auth/sign-in-form";

export default function Page() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151922]/90 p-7 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
      <p className="text-sm text-slate-400 mb-5">Sign in to continue to your dashboard</p>
      <SignInForm />
    </div>
  );
}