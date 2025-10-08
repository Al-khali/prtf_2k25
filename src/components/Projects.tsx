import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    imageUrl: "/images/projects/pipeline.jpg",
    title: "Pipeline Data Temps Réel pour la Fintech NovaPay",
    description:
      "Architecture de streaming, alerting prédictif et gouvernance des données pour plus de 15M d'événements quotidiens.",
    tags: ["Next.js", "Python", "Kafka", "dbt", "GCP"],
  },
  {
    imageUrl: "/images/projects/dashboard.jpg",
    title: "Tableau de Bord IA pour Opérations Industrielles",
    description:
      "Visualisation 3D, prévisions de maintenance et simulation interactive sur un réseau de capteurs industriels.",
    tags: ["React Three Fiber", "TypeScript", "TensorFlow", "Grafana"],
  },
  {
    imageUrl: "/images/projects/motion.jpg",
    title: "Expérience Immersive Data + Art",
    description:
      "Installation générative multi-sensorielle pour festival numérique, alimentée par des flux open data en direct.",
    tags: ["WebGL", "Node.js", "FastAPI", "Music DSP"],
  },
  {
    imageUrl: "/images/projects/warehouse.jpg",
    title: "Suite Analytics pour Produit SaaS B2B",
    description:
      "Stack analytique modulaire avec scorecards intelligents, alertes contextuelles et narration automatisée.",
    tags: ["Snowflake", "Airflow", "React", "LLM Ops"],
  },
];

export default function Projects() {
  return (
    <section id="projets" className="section-container flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h2 className="section-heading">Projets &amp; Études de Cas</h2>
        <p className="section-subtext max-w-3xl">
          Chaque mission est pensée comme un laboratoire où pipelines robustes, intelligences augmentées et design immersif se renforcent mutuellement.
        </p>
      </header>

      <div className="grid gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
