import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-wellora-100 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wellora-500 to-wellora-700 flex items-center justify-center text-white font-display font-extrabold text-lg shadow-md">
            S
          </div>
          <div>
            <div className="font-display font-extrabold text-lg leading-none text-wellora-950">
              Saurav Danej
            </div>
            <div className="text-xs text-wellora-700 mt-0.5">
              90-Day AI/ML LinkedIn Content System
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-wellora-800 hover:bg-wellora-50 font-medium"
          >
            Days
          </Link>
          <a
            href="https://github.com/SauravDnj"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg text-wellora-800 hover:bg-wellora-50 font-medium"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.instagram.com/saurav_dnj_24"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg text-wellora-800 hover:bg-wellora-50 font-medium"
          >
            Instagram ↗
          </a>
          <a
            href="https://www.linkedin.com/in/sauravdnj"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-wellora-600 text-white hover:bg-wellora-700 font-semibold"
          >
            in/sauravdnj
          </a>
        </nav>
      </div>
    </header>
  );
}
