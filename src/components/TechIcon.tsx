import { IconType } from 'react-icons';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGooglecloud,
  SiTerraform,
  SiApacheairflow,
  SiApachespark,
  SiSnowflake,
  SiDbt,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiUnity,
  SiGodotengine,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiBlender,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiGraphql,
  SiPrisma,
  SiSupabase,
  SiVercel,
  SiNetlify,
  SiVite,
  SiWebpack,
  SiBabel,
  SiEslint,
  SiPrettier,
  SiJest,
  SiCypress,
  SiStorybook,
  SiFramer,
  SiThreedotjs,
  SiD3Dotjs,
  SiChartdotjs,
  SiJupyter,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiStreamlit,
  SiFastapi,
  SiFlask,
  SiDjango,
  SiExpress,
  SiNestjs,
  SiGraphql as SiApollo,
  SiSocketdotio,
  SiRabbitmq,
  SiApachekafka,
  SiElasticsearch,
  SiPrometheus,
  SiGrafana,
  SiJenkins,
  SiGithubactions,
  SiCircleci,
  SiLinux,
  SiUbuntu,
  SiDebian,
  SiNixos,
  SiVim,
  SiNeovim,
  SiIntellijidea,
  SiPycharm,
  SiWebstorm,
  SiPostman,
  SiInsomnia,
} from 'react-icons/si';
import { FaDatabase, FaServer, FaCloud, FaCode, FaTerminal } from 'react-icons/fa';
import { DiMysql } from 'react-icons/di';

/**
 * Mapping des noms de technos vers leurs icônes
 * Utilise react-icons (Simple Icons + Font Awesome + Devicons)
 */
const techIconMap: Record<string, IconType> = {
  // Languages
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Node.js': SiNodedotjs,
  'NodeJS': SiNodedotjs,
  
  // Frontend
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'NextJS': SiNextdotjs,
  'Vue': SiVuedotjs,
  'Vue.js': SiVuedotjs,
  'Angular': SiAngular,
  'Svelte': SiSvelte,
  'Tailwind': SiTailwindcss,
  'TailwindCSS': SiTailwindcss,
  'Three.js': SiThreedotjs,
  'ThreeJS': SiThreedotjs,
  'D3.js': SiD3Dotjs,
  'Chart.js': SiChartdotjs,
  'Framer': SiFramer,
  'Framer Motion': SiFramer,
  
  // Backend
  'FastAPI': SiFastapi,
  'Flask': SiFlask,
  'Django': SiDjango,
  'Express': SiExpress,
  'NestJS': SiNestjs,
  'GraphQL': SiGraphql,
  'Apollo': SiApollo,
  'Socket.io': SiSocketdotio,
  
  // Databases
  'PostgreSQL': SiPostgresql,
  'Postgres': SiPostgresql,
  'MongoDB': SiMongodb,
  'Redis': SiRedis,
  'MySQL': DiMysql,
  'Prisma': SiPrisma,
  'Supabase': SiSupabase,
  'Database': FaDatabase,
  
  // Data Engineering
  'Airflow': SiApacheairflow,
  'Apache Airflow': SiApacheairflow,
  'Spark': SiApachespark,
  'Apache Spark': SiApachespark,
  'Snowflake': SiSnowflake,
  'dbt': SiDbt,
  'BigQuery': SiGooglecloud,
  'Kafka': SiApachekafka,
  'RabbitMQ': SiRabbitmq,
  'Elasticsearch': SiElasticsearch,
  
  // ML/AI
  'PyTorch': SiPytorch,
  'TensorFlow': SiTensorflow,
  'scikit-learn': SiScikitlearn,
  'Jupyter': SiJupyter,
  'NumPy': SiNumpy,
  'Pandas': SiPandas,
  'Plotly': SiPlotly,
  'Streamlit': SiStreamlit,
  
  // DevOps
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Terraform': SiTerraform,
  'Jenkins': SiJenkins,
  'GitHub Actions': SiGithubactions,
  'CircleCI': SiCircleci,
  'Prometheus': SiPrometheus,
  'Grafana': SiGrafana,
  
  // Cloud
  'AWS': FaCloud,
  'GCP': SiGooglecloud,
  'Azure': FaCloud,
  'Vercel': SiVercel,
  'Netlify': SiNetlify,
  'Cloud': FaCloud,
  
  // Tools
  'Git': SiGit,
  'GitHub': SiGithub,
  'GitLab': SiGitlab,
  'Vite': SiVite,
  'Webpack': SiWebpack,
  'Babel': SiBabel,
  'ESLint': SiEslint,
  'Prettier': SiPrettier,
  'Jest': SiJest,
  'Cypress': SiCypress,
  'Playwright': FaCode,
  'Storybook': SiStorybook,
  'Postman': SiPostman,
  'Insomnia': SiInsomnia,
  
  // Game Dev
  'Unity': SiUnity,
  'Godot': SiGodotengine,
  'Blender': SiBlender,
  
  // Design
  'Figma': SiFigma,
  'Photoshop': SiAdobephotoshop,
  'Illustrator': SiAdobeillustrator,
  
  // OS/Editors
  'Linux': SiLinux,
  'Ubuntu': SiUbuntu,
  'Debian': SiDebian,
  'Arch': SiLinux,
  'NixOS': SiNixos,
  'Vim': SiVim,
  'Neovim': SiNeovim,
  'VS Code': FaCode,
  'VSCode': FaCode,
  'IntelliJ': SiIntellijidea,
  'PyCharm': SiPycharm,
  'WebStorm': SiWebstorm,
  'Terminal': FaTerminal,
  'Server': FaServer,
  'Code': FaCode,
};

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

/**
 * TechIcon Component
 * Affiche l'icône correspondant à une techno
 * Utilise react-icons pour un rendu optimal
 */
export default function TechIcon({ name, className = '', size = 20 }: TechIconProps) {
  const Icon = techIconMap[name] || FaCode; // Fallback vers icône code générique
  
  return <Icon className={className} size={size} />;
}

/**
 * Hook pour vérifier si une icône existe
 */
export function hasTechIcon(name: string): boolean {
  return name in techIconMap;
}

/**
 * Liste de toutes les technos supportées
 */
export const supportedTechs = Object.keys(techIconMap);
