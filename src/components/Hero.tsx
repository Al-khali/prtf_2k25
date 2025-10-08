import Link from "next/link";

export default function Hero() {
  return (
    <section className="section-container min-h-screen flex flex-col justify-center gap-8 text-center md:text-left">
      <div className="flex flex-col gap-6">
        <p className="uppercase tracking-[0.3em] text-sm text-[var(--accent-secondary)]">
          Portfolio 2025
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          Data Engineer &amp; Creative Technologist
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl">
          Je transforme des données complexes en pipelines scalables et en expériences interactives.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <Link
          href="#projets"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-medium shadow-lg shadow-[var(--accent-primary)]/40 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]"
        >
          Voir mes projets
        </Link>
        <Link
          href="#contact"
          className="px-8 py-3 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] font-medium transition hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]"
        >
          Me contacter
        </Link>
      </div>
    </section>
  );
}