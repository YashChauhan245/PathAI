import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-0">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-title">Path AI Dashboard</h1>
          <p className="text-slate-300 mt-2">Live market intelligence and AI-guided career actions</p>
        </div>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#7cc7ff" />}
      >
        {children}
      </Suspense>
    </div>
  );
}