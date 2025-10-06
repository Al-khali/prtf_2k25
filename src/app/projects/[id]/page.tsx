import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectById, projects } from '@/lib/projects-data';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

/**
 * Generate static params for all projects
 */
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

/**
 * Generate metadata for project pages
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectById(params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Khalid's Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

/**
 * Project detail page
 */
export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
