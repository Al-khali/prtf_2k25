'use client';

import { FormEvent } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const subject = encodeURIComponent("Projet Data & Tech");
    const body = encodeURIComponent(
      `Nom: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`,
    );

    window.location.href = `mailto:contact@alkhali.dev?subject=${subject}&body=${body}`;
    form.reset();
  };

  return (
    <section id="contact" className="section-container flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="section-heading">Travaillons Ensemble</h2>
        <p className="section-subtext max-w-2xl">
          Parlons de vos pipelines, produits data ou expériences immersives. Je reviens vers vous sous 48 heures avec un plan d’action.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="card-surface p-8 flex flex-col gap-6"
        >
          <label className="flex flex-col gap-2">
            Nom
            <input
              name="name"
              type="text"
              required
              placeholder="Votre nom"
            />
          </label>

          <label className="flex flex-col gap-2">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="vous@entreprise.com"
            />
          </label>

          <label className="flex flex-col gap-2">
            Message
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Décrivez votre projet ou vos besoins..."
            />
          </label>

          <button type="submit" className="button-primary self-start">
            Envoyer
          </button>
        </form>

        <aside className="card-surface p-8 flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-[var(--accent-secondary)]">
            Restons connectés
          </h3>
          <ul className="flex flex-col gap-4 text-[var(--text-secondary)]">
            <li>
              <Link
                href="https://github.com/Al-khali"
                className="group inline-flex items-center gap-3 transition-colors hover:text-[var(--accent-secondary)]"
              >
                <Github className="h-5 w-5" />
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/khalid-aourik/"
                className="group inline-flex items-center gap-3 transition-colors hover:text-[var(--accent-secondary)]"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="mailto:contact@alkhali.dev"
                className="group inline-flex items-center gap-3 transition-colors hover:text-[var(--accent-secondary)]"
              >
                <Mail className="h-5 w-5" />
                contact@alkhali.dev
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
