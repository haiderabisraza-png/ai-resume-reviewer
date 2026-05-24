"use client";

import { type User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/upload": "Upload Resume",
  "/reviews": "My Reviews",
};

export default function TopBar({ user }: { user: User }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? (pathname.startsWith("/analysis") ? "Resume Analysis" : "ResumeAI");

  return (
    <header className="h-16 border-b border-surface-200 bg-white flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-lg font-semibold text-surface-900">{title}</h1>
      <div className="flex items-center gap-3">
        <Link
          href="/upload"
          className="btn-primary text-xs px-4 py-2"
        >
          + New Review
        </Link>
        <div className="flex items-center gap-2">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-brand-700 font-semibold text-xs">
                {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-surface-700 hidden sm:block">
            {user.name ?? user.email}
          </span>
        </div>
      </div>
    </header>
  );
}
