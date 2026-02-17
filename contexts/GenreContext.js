"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { saveUserGenres, getUserGenres } from "@/lib/firestore";

const GenreContext = createContext(null);

export function GenreProvider({ children }) {
  const { user } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genresLoaded, setGenresLoaded] = useState(false);

  // Load genres from Firestore when user signs in
  useEffect(() => {
    if (user) {
      getUserGenres(user.uid).then((genres) => {
        if (genres && genres.length > 0) {
          setSelectedGenres(genres);
        }
        setGenresLoaded(true);
      });
    } else {
      setGenresLoaded(true);
    }
  }, [user]);

  async function updateGenres(genres) {
    setSelectedGenres(genres);
    if (user) {
      await saveUserGenres(user.uid, genres);
    }
  }

  function clearGenres() {
    setSelectedGenres([]);
  }

  const value = {
    selectedGenres,
    genresLoaded,
    updateGenres,
    clearGenres,
    hasGenres: selectedGenres.length >= 3,
  };

  return (
    <GenreContext.Provider value={value}>
      {children}
    </GenreContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error("useGenres must be used within a GenreProvider");
  }
  return context;
}
