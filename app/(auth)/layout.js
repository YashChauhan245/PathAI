const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="hidden lg:flex rounded-2xl border border-white/10 bg-gradient-to-b from-[#171b23] to-[#11141b] p-10 flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Path AI</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white">
              Build your career with practical AI support
            </h2>
            <p className="mt-4 text-slate-300 max-w-md">
              Resume building, interview practice, and smart insights in one clean dashboard.
            </p>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>- One account for all growth tools</p>
            <p>- Fast onboarding and secure authentication</p>
            <p>- Works with Email, Google, and GitHub</p>
          </div>
        </div>

        <div className="flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;