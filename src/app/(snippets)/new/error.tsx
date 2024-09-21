"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div>
      <h1>An unhandled error occurred while creating the snippet.</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
