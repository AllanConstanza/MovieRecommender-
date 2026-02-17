"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";

export default function AuthGateModal({ isOpen, onClose }) {
  const [showAuth, setShowAuth] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-zinc-900 p-6 text-center shadow-xl sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600/20">
            <svg
              className="h-7 w-7 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">
            Sign In Required
          </h2>
          <p className="mb-6 text-sm text-zinc-400">
            Please sign in or create an account to use this feature.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Sign In / Create Account
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-zinc-800 py-3 font-medium text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => {
          setShowAuth(false);
          onClose();
        }}
      />
    </>
  );
}
