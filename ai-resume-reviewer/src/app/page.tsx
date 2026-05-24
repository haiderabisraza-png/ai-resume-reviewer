import Link from "next/link";
import { APP_NAME } from "@/constants";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-hidden">
      {/* Background mesh */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none opacity-60" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.12)_0%,_transparent_60%)] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-display text-xl font-bold">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-surface-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          Powered by GPT-4o
        </div>

        <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 animate-slide-up leading-tight">
          Your Resume,{" "}
          <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-brand-300 bg-clip-text text-transparent">
            Perfected
          </span>
          <br />
          by AI
        </h1>

        <p
          className="text-xl text-surface-400 max-w-2xl mx-auto mb-10 animate-slide-up leading-relaxed"
          style={{ animationDelay: "0.1s" }}
        >
          Upload your resume and get instant AI-powered feedback on ATS
          compatibility, keyword optimization, and actionable improvements to
          land more interviews.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="/register"
            className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all hover:shadow-glow hover:-translate-y-0.5"
          >
            Analyze My Resume — Free
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 rounded-2xl border border-surface-700 text-surface-300 hover:border-surface-500 hover:text-white font-semibold text-base transition-all"
          >
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-20 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { value: "98%", label: "ATS Accuracy" },
            { value: "3x", label: "More Interviews" },
            { value: "<30s", label: "Analysis Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-surface-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            Everything you need to
            <span className="text-gradient"> stand out</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-xl mx-auto">
            Comprehensive AI analysis that gives you a competitive edge in
            today&apos;s job market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-surface-800 bg-surface-900/50 hover:border-surface-700 transition-all group animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center mb-4 group-hover:bg-brand-600/30 transition-colors text-xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-surface-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-32 text-center">
        <div className="p-12 rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-900/40 to-accent-900/20">
          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to level up?
          </h2>
          <p className="text-surface-400 mb-8 text-lg">
            Join thousands of job seekers who improved their resume with AI.
          </p>
          <Link
            href="/register"
            className="inline-flex px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all hover:shadow-glow"
          >
            Start for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-surface-800 py-8 text-center text-surface-500 text-sm">
        © {new Date().getFullYear()} {APP_NAME}. Built with Next.js & OpenAI.
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "🎯",
    title: "ATS Score Analysis",
    description:
      "Get your ATS compatibility score and understand exactly how applicant tracking systems read your resume.",
  },
  {
    icon: "🔑",
    title: "Keyword Optimization",
    description:
      "Identify missing keywords for your target role and see which ones you already have covered.",
  },
  {
    icon: "📊",
    title: "Job Description Match",
    description:
      "Paste any job description to get a tailored match percentage and specific improvement tips.",
  },
  {
    icon: "✨",
    title: "Strengths & Weaknesses",
    description:
      "Detailed breakdown of what works and what needs improvement in your resume.",
  },
  {
    icon: "💡",
    title: "Actionable Improvements",
    description:
      "Step-by-step suggestions to make your resume stand out from the competition.",
  },
  {
    icon: "📁",
    title: "Review History",
    description:
      "Save and track all your resume reviews over time to measure your progress.",
  },
];
