"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGenres } from "@/contexts/GenreContext";
import AuthModal from "./AuthModal";

const navLinks = [
  { href: "/recommendations", label: "Recommendations" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/reviews", label: "Reviews" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { clearGenres } = useGenres();
  const pathname = usePathname();
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);

  async function handleSignOut() {
    await logout();
    clearGenres();
    router.push("/");
  }

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-white">
            The Movie<span className="text-indigo-400"> Rec</span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden text-sm text-zinc-400 sm:block">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
