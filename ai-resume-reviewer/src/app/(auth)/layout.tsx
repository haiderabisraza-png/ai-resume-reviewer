import Link from "next/link";
import { APP_NAME } from "@/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-900 to-surface-950 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="font-display text-2xl font-bold text-white">
              {APP_NAME}
            </span>
          </Link>

          <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            Land your
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              dream job
            </span>
          </h2>
          <p className="text-surface-400 text-lg max-w-sm mx-auto leading-relaxed">
            AI-powered resume analysis that helps you beat ATS systems and
            impress recruiters.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {[
              { icon: "🎯", text: "ATS Analysis" },
              { icon: "🔑", text: "Keywords" },
              { icon: "📊", text: "Job Matching" },
              { icon: "✨", text: "AI Feedback" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-surface-700 bg-surface-800/50 text-surface-300 text-sm"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex lg:hidden items-center gap-2 mb-8"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-display text-xl font-bold text-white">
              {APP_NAME}
            </span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
