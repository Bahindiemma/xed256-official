import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading font-bold text-8xl gradient-text mb-4">
          404
        </h1>
        <h2 className="font-heading font-semibold text-2xl text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-zinc-500 text-sm mb-8">
          Looks like you wandered off the beat. Let&apos;s get you back to the music.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
