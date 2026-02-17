"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "@/lib/firestore";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getWatchlist(user.uid)
        .then(setWatchlist)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  async function addMovie(movie) {
    // Optimistic update
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
    if (user) {
      await addToWatchlist(user.uid, movie);
    }
  }

  async function removeMovie(movieId) {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    if (user) {
      await removeFromWatchlist(user.uid, movieId);
    }
  }

  function isInWatchlist(movieId) {
    return watchlist.some((m) => m.id === movieId);
  }

  const value = { watchlist, loading, addMovie, removeMovie, isInWatchlist };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
