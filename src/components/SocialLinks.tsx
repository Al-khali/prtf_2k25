'use client';

import { motion, type Variants } from 'framer-motion';

interface SocialLink {
  platform: 'linkedin' | 'github' | 'soundcloud';
  url: string;
  label: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/khalid',
    label: 'LinkedIn',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    platform: 'github',
    url: 'https://github.com/khalid',
    label: 'GitHub',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    platform: 'soundcloud',
    url: 'https://soundcloud.com/khalid',
    label: 'SoundCloud',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.051 0-.09.04-.099.098l-.157 1.327.157 1.265c.008.057.048.097.099.097.05 0 .09-.04.099-.097l.174-1.265-.174-1.327c-.009-.057-.05-.098-.1-.098m1.753-1.214c-.065 0-.117.052-.117.117l-.214 2.358.214 2.287c0 .065.052.117.117.117.065 0 .117-.052.117-.117l.241-2.287-.241-2.358c0-.065-.052-.117-.117-.117m.899-.551c-.078 0-.14.063-.14.14l-.195 2.91.195 2.813c0 .078.062.14.14.14.078 0 .14-.062.14-.14l.221-2.813-.221-2.91c0-.077-.062-.14-.14-.14m.899-.205c-.09 0-.163.074-.163.163l-.176 3.115.176 3.025c0 .09.073.164.163.164.09 0 .164-.074.164-.164l.199-3.025-.199-3.115c0-.089-.074-.163-.164-.163m.899.107c-.104 0-.187.084-.187.187l-.157 3.008.157 2.939c0 .104.083.188.187.188.104 0 .188-.084.188-.188l.176-2.939-.176-3.008c0-.103-.084-.187-.188-.187m.899.384c-.117 0-.21.094-.21.21l-.137 2.624.137 2.71c0 .117.093.211.21.211.116 0 .21-.094.21-.211l.154-2.71-.154-2.624c0-.116-.094-.21-.21-.21m.899.154c-.13 0-.233.103-.233.232l-.118 2.47.118 2.622c0 .13.103.233.233.233.129 0 .232-.103.232-.233l.133-2.622-.133-2.47c0-.129-.103-.232-.232-.232m.899.29c-.142 0-.256.115-.256.256l-.099 2.18.099 2.534c0 .142.114.257.256.257.142 0 .256-.115.256-.257l.111-2.534-.111-2.18c0-.141-.114-.256-.256-.256m.899.189c-.155 0-.28.126-.28.28l-.08 1.991.08 2.446c0 .155.125.28.28.28.155 0 .28-.125.28-.28l.09-2.446-.09-1.991c0-.154-.125-.28-.28-.28m.899.165c-.168 0-.303.136-.303.303l-.061 1.826.061 2.358c0 .168.135.304.303.304.168 0 .303-.136.303-.304l.068-2.358-.068-1.826c0-.167-.135-.303-.303-.303m.899.165c-.181 0-.327.147-.327.327l-.042 1.661.042 2.27c0 .181.146.328.327.328.181 0 .327-.147.327-.328l.047-2.27-.047-1.661c0-.18-.146-.327-.327-.327m.899.21c-.194 0-.35.157-.35.35l-.023 1.451.023 2.182c0 .194.156.35.35.35.194 0 .35-.156.35-.35l.026-2.182-.026-1.451c0-.193-.156-.35-.35-.35m.899.23c-.207 0-.374.168-.374.374l-.004 1.221.004 2.094c0 .207.167.374.374.374.207 0 .374-.167.374-.374l.005-2.094-.005-1.221c0-.206-.167-.374-.374-.374m.899.26c-.22 0-.397.178-.397.397v3.315c0 .22.177.397.397.397.22 0 .397-.177.397-.397V12.504c0-.219-.177-.397-.397-.397m.899.29c-.232 0-.42.189-.42.42v2.735c0 .232.188.42.42.42.232 0 .42-.188.42-.42v-2.735c0-.231-.188-.42-.42-.42m.899.32c-.245 0-.443.199-.443.443v2.095c0 .245.198.443.443.443.245 0 .443-.198.443-.443v-2.095c0-.244-.198-.443-.443-.443m.899.35c-.258 0-.466.209-.466.466v1.395c0 .258.208.467.466.467.258 0 .467-.209.467-.467v-1.395c0-.257-.209-.466-.467-.466m.899.42c-.271 0-.49.22-.49.49v.555c0 .271.219.49.49.49.271 0 .49-.219.49-.49v-.555c0-.27-.219-.49-.49-.49"/>
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function SocialLinks() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="flex flex-wrap gap-4 justify-center md:justify-start"
    >
      {socialLinks.map((link) => (
        <motion.a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50"
          aria-label={`Visit ${link.label} profile`}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-magenta-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative flex items-center gap-3">
            <div className="text-cyan-300 group-hover:text-cyan-400 transition-colors duration-300">
              {link.icon}
            </div>
            <span className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
              {link.label}
            </span>
          </div>

          {/* Luminous border effect */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.3)]" />
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
