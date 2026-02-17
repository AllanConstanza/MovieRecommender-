"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchGenres } from "@/lib/tmdb";
import { useGenres } from "@/contexts/GenreContext";
import LoadingSpinner from "./LoadingSpinner";

export default function GenreSelector({ onDone }) {
  const router = useRouter();
  const { selectedGenres, updateGenres } = useGenres();
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState(selectedGenres);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGenres()
      .then((data) => {
        setGenres(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load genres. Check your TMDB API key.");
        setLoading(false);
      });
  }, []);

  // Sync if selectedGenres changes (e.g. user signs in and genres load from Firestore)
  useEffect(() => {
    if (selectedGenres.length > 0) {
      setSelected(selectedGenres);
    }
  }, [selectedGenres]);

  function toggleGenre(genreId) {
    setSelected((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  }

  async function handleContinue() {
    await updateGenres(selected);
    if (onDone) {
      onDone();
    } else {
      router.push("/recommendations");
    }
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="rounded-lg bg-red-500/20 p-4 text-red-300">{error}</div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {genres.map((genre) => {
          const isSelected = selected.includes(genre.id);
          return (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                  : "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800"
              }`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {selected.length} of 3 minimum selected
        </p>
        <div className="flex gap-3">
          {onDone && (
            <button
              onClick={onDone}
              className="rounded-lg bg-zinc-800 px-6 py-3 font-semibold text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleContinue}
            disabled={selected.length < 3}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {onDone ? "Update Genres" : "Get Recommendations"}
          </button>
        </div>
      </div>
    </div>
  );
}
