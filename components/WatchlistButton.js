"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useWatchlist } from "@/contexts/WatchlistContext";
import AuthGateModal from "./AuthGateModal";

export default function WatchlistButton({ movie }) {
  const { user } = useAuth();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const [showAuthGate, setShowAuthGate] = useState(false);
  const saved = isInWatchlist(movie.id);

  function handleClick(e) {
    e.stopPropagation();
    if (!user) {
      setShowAuthGate(true);
      return;
    }
    if (saved) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        title={saved ? "Remove from Watchlist" : "Add to Watchlist"}
        className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
          saved
            ? "bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30"
            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
        }`}
      >
        <svg
          className="h-4 w-4"
          fill={saved ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        {saved ? "Saved" : "Watchlist"}
      </button>

      <AuthGateModal
        isOpen={showAuthGate}
        onClose={() => setShowAuthGate(false)}
      />
    </>
  );
}
