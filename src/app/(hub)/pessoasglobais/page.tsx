import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
  title: "Pessoas Globais — Global Professionals Network",
  description:
    "Pessoas Globais connects Brazilian and multicultural professionals building careers and businesses across borders.",
};

const pessoasData = {
  name: "Pessoas Globais",
  tagline: "Global Professionals Network",
  description:
    "Connecting Brazilian and multicultural professionals building careers and businesses across borders. Your origin is your advantage.",
  mission:
    "To build a network of global professionals who see borders as bridges, not barriers. We believe multicultural experience is a competitive advantage in the modern workplace.",
  offerings: [
    "Career Connections — Network with professionals across industries",
    "Cross-Border Business — Build ventures that span countries",
    "Professional Development — Skills for the global marketplace",
    "Community & Belonging — Find your people, wherever you are",
    "Resources & Insights — Navigate global career challenges",
  ],
  audience: [
    "Brazilian professionals in the U.S. and abroad",
    "Multicultural talent building global careers",
    "Entrepreneurs with international ambitions",
    "Anyone who's ever felt 'from everywhere and nowhere'",
  ],
  socialLinks: [
    { platform: "Website", url: "https://pessoasglobais.com", label: "pessoasglobais.com" },
    { platform: "Instagram", url: "https://instagram.com/pessoasglobais", label: "@pessoasglobais" },
  ],
};

export default function PessoasGlobaisPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-4 py-20 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {pessoasData.name}
          </h1>
          <p className="mb-12 text-2xl text-neutral-400">
            {pessoasData.tagline}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-neutral-300">{pessoasData.mission}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">What We Offer</h2>
            <ul className="space-y-3">
              {pessoasData.offerings.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-cyan-500">→</span>
                  <span className="text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16 rounded-lg border border-cyan-900/30 bg-cyan-950/20 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Who We Serve</h2>
            <ul className="space-y-2">
              {pessoasData.audience.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-cyan-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Follow Pessoas Globais
            </h2>
            <SocialLinks links={pessoasData.socialLinks} />
          </div>

          <p className="mb-12 text-center text-lg italic text-neutral-500">
            A world where your origin is your advantage, not your obstacle.
          </p>

          <div className="text-center">
            <a
              href="/subsidiaries"
              className="inline-block rounded-lg bg-neutral-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              ← Back to GrowBiz Universe
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
