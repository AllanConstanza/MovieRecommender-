"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950">
        {/* Top bar with sign in */}
        <div className="absolute right-6 top-6 z-10 animate-fade-in">
          {user ? (
            <span className="text-sm text-zinc-400">{user.email}</span>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-indigo-500 hover:bg-zinc-800"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          {/* Title */}
          <h1 className="animate-slide-in-left text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
            The Movie
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Rec
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-in-right mt-6 max-w-lg text-center text-lg text-zinc-400 sm:text-xl">
            Discover movies tailored to your taste. Pick your genres, build your
            watchlist, and share your reviews.
          </p>

          {/* Get Started button */}
          <div className="animate-fade-in-up mt-10">
            <Link
              href="/genres"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Get Started
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        </div>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
