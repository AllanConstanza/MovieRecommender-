"use client";

import { useState } from "react";

export default function ReviewForm({ movie, onSubmit, onCancel, existingReview }) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [reviewText, setReviewText] = useState(existingReview?.reviewText || "");
  const [hoveredStar, setHoveredStar] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, reviewText });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 border-t border-zinc-700 pt-3">
      <div>
        <p className="mb-1 text-xs text-zinc-400">Your rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="text-xl transition-colors"
            >
              <span
                className={
                  star <= (hoveredStar || rating)
                    ? "text-amber-400"
                    : "text-zinc-600"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write a review (optional)"
        rows={2}
        className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={rating === 0}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
