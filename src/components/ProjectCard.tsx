import Link from "next/link";

type ProjectCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  projectUrl?: string;
};

export default function ProjectCard({
  imageUrl,
  title,
  description,
  tags,
  projectUrl = "#",
}: ProjectCardProps) {
  return (
    <Link
      href={projectUrl}
  className="group relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[rgba(10,10,20,0.75)] backdrop-blur-lg transition-transform duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]"
    >
      <div
        className="h-60 bg-cover bg-center opacity-90 transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden="true"
      />

  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(5,5,10,0.6)] to-[rgba(5,5,10,0.95)] pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6 md:p-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {title}
          </h3>
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border-color)] bg-[rgba(10,10,20,0.65)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

  <div className="absolute inset-0 flex items-center justify-center bg-[rgba(106,90,205,0.12)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="rounded-full border border-[var(--accent-secondary)] px-6 py-2 text-sm font-medium text-[var(--accent-secondary)] shadow-[0_0_25px_rgba(0,191,255,0.35)]">
          Voir l’étude de cas
        </span>
      </div>
    </Link>
  );
}
