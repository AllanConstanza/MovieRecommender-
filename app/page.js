"use client";

import { useAuth } from "@/contexts/AuthContext";
import GenreSelector from "@/components/GenreSelector";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold text-white">
          Welcome to MovieRec
        </h1>
        <p className="text-lg text-zinc-400">
          Pick at least 3 genres you love, and we&apos;ll recommend movies just for
          you.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in from the navbar to save your preferences across sessions.
        </p>
      </div>

      <GenreSelector />
    </div>
  );
}
