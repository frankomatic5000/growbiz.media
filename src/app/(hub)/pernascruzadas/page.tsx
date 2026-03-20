import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
  title: "Pernas Cruzadas — Lifestyle & Culture",
  description:
    "Pernas Cruzadas celebrates multicultural identity, lifestyle, and creative expression. Culture that crosses borders.",
};

const pernasData = {
  name: "Pernas Cruzadas",
  tagline: "Lifestyle & Culture",
  description:
    "A creative lifestyle brand celebrating multicultural identity, culture, and expression. Where Brazilian warmth meets global sophistication. Stories, style, and substance.",
  mission:
    "To celebrate the art of living between cultures. Food that takes longer to prepare than to eat. Conversations that matter. Aesthetics that honor heritage while embracing the new.",
  topics: [
    "Cultural Identity — Living authentically between worlds",
    "Lifestyle & Home — Spaces that tell your story",
    "Food & Entertaining — Meals that build community",
    "Travel & Discovery — Meaningful journeys, not tourist traps",
    "Creative Expression — Art, design, and personal style",
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/pernascruzadastalks", label: "@pernascruzadastalks" },
  ],
  vibe: "Warmth without pretension. Elegance without stuffiness. The kind of brand that makes you want to linger over coffee, discuss Dostoevsky, and plan your next adventure.",
};

export default function PernasCruzadasPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-4 py-20 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {pernasData.name}
          </h1>
          <p className="mb-12 text-2xl text-neutral-400">
            {pernasData.tagline}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-neutral-300">{pernasData.mission}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">What We Explore</h2>
            <ul className="space-y-3">
              {pernasData.topics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-rose-500">→</span>
                  <span className="text-neutral-300">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16 rounded-lg border border-rose-900/30 bg-rose-950/20 p-8">
            <h2 className="mb-4 text-2xl font-semibold">The Vibe</h2>
            <p className="text-neutral-300">{pernasData.vibe}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Follow Pernas Cruzadas
            </h2>
            <SocialLinks links={pernasData.socialLinks} />
          </div>

          <p className="mb-12 text-center text-lg italic text-neutral-500">
            A great meal, great music, and great company are not luxuries — they
            are requirements.
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
