const expertise = [
  {
    title: "Data Engineering",
    items: ["dbt", "Kafka", "Airflow", "BigQuery", "Snowflake"],
  },
  {
    title: "Backend",
    items: ["Node.js", "FastAPI", "GraphQL", "PostgreSQL", "Terraform"],
  },
  {
    title: "AI/ML",
    items: ["MLflow", "PyTorch", "LangChain", "Feature Store", "LLM Ops"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "WebSockets"],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section-container flex flex-col gap-10">
      <h2 className="section-heading">Mon Expertise Technique</h2>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {expertise.map(({ title, items }) => (
          <div
            key={title}
            className="card-surface p-6 flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold tracking-wide text-[var(--accent-secondary)]">
              {title}
            </h3>
            <ul className="flex flex-wrap gap-2 text-sm text-[var(--text-secondary)]">
              {items.map((tech) => (
                <li key={tech} className="tag-badge bg-transparent">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
