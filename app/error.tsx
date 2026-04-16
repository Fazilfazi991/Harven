"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("DEPLOYMENT_ERROR:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-terracotta/20">
        <div className="text-terracotta text-4xl mb-4">⚠️</div>
        <h2 className="font-display text-2xl font-bold text-text-dark mb-4">
          Diagnostic Error Detected
        </h2>
        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          The website encountered a client-side issue. Please share the message below with the developer:
        </p>
        <div className="bg-text-dark/5 p-4 rounded-xl font-mono text-xs text-terracotta break-all overflow-auto max-h-40 mb-8 border border-black/5">
          {error.message || "Unknown Runtime Error"}
          {error.digest && <div className="mt-2 text-text-muted opacity-50">Digest: {error.digest}</div>}
        </div>
        <button
          onClick={() => reset()}
          className="w-full bg-forest text-white py-3 rounded-full font-semibold transition-all hover:bg-forest-deep"
        >
          Try to Recover
        </button>
      </div>
    </div>
  );
}
