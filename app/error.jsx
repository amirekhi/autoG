"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold">Oops! Something went wrong 😵</h1>
      <p className="text-gray-500">{error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
