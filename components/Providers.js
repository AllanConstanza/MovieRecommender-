"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { GenreProvider } from "@/contexts/GenreContext";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
import { ReviewsProvider } from "@/contexts/ReviewsContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <GenreProvider>
        <WatchlistProvider>
          <ReviewsProvider>
            {children}
          </ReviewsProvider>
        </WatchlistProvider>
      </GenreProvider>
    </AuthProvider>
  );
}
