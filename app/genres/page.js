"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import GenreSelector from "@/components/GenreSelector";
import AuthModal from "@/components/AuthModal";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GenresPage() {
  const { user, loading: authLoading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (authLoading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold text-white">
          Choose Your Genres
        </h1>
        <p className="text-lg text-zinc-400">
          Pick at least 3 genres you love, and we&apos;ll recommend movies just
          for you.
        </p>

        {/* Sign in or continue as guest message */}
        {!user && (
          <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
            <p className="text-sm text-zinc-400">
              <button
                onClick={() => setShowAuth(true)}
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </button>
              {" "}to save your preferences across sessions, or continue as a
              guest.
            </p>
          </div>
        )}
      </div>

      <GenreSelector />

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}
