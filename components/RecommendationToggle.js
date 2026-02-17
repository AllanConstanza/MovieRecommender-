"use client";

export default function RecommendationToggle({ enabled, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <div className="relative">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className="h-6 w-11 rounded-full bg-zinc-700 transition-colors peer-checked:bg-indigo-600" />
        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </div>
      <span className="text-sm text-zinc-300">
        Use my reviews for recommendations
      </span>
    </label>
  );
}
