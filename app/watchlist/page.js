"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useWatchlist } from "@/contexts/WatchlistContext";
import MovieGrid from "@/components/MovieGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import AuthGateModal from "@/components/AuthGateModal";

export default function WatchlistPage() {
  const { user } = useAuth();
  const { watchlist, loading } = useWatchlist();
  const [showAuthGate, setShowAuthGate] = useState(!user);

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-16 text-center">
          <p className="text-lg text-zinc-400">
            Sign in to save and view your watchlist.
          </p>
        </div>
        <AuthGateModal
          isOpen={showAuthGate}
          onClose={() => setShowAuthGate(false)}
        />
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
        <p className="mt-1 text-zinc-400">
          {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-16 text-center">
          <p className="text-lg text-zinc-400">Your watchlist is empty.</p>
          <p className="mt-1 text-sm text-zinc-500">
            Browse recommendations and bookmark movies to watch later.
          </p>
        </div>
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  );
}
