import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb";

export default function ReviewCard({ review, onDelete }) {
  const posterUrl = getPosterUrl(review.posterPath, "w185");
  const date = new Date(review.reviewed_at).toLocaleDateString();

  return (
    <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={review.movieTitle}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-600">
            N/A
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-semibold text-white">{review.movieTitle}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= review.rating ? "text-amber-400" : "text-zinc-600"}
              >
                ★
              </span>
            ))}
          </span>
          <span className="text-zinc-500">{date}</span>
        </div>
        {review.reviewText && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {review.reviewText}
          </p>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(review.movieId)}
            className="mt-2 self-start text-xs text-red-400 hover:text-red-300"
          >
            Delete Review
          </button>
        )}
      </div>
    </div>
  );
}
