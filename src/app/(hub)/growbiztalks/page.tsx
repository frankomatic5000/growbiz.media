import { SocialLinks } from "@/components/SocialLinks";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
  title: "GrowBiz Talks — Live Stage for Founders",
  description:
    "GrowBiz Talks is a live stage and speaking events platform where founders build authority, generate content, and expand their network.",
};

const talksData = {
  name: "GrowBiz Talks",
  tagline: "Live Stage for Founders",
  description:
    "Curated speaking stages where entrepreneurs build authority, generate content, and expand their network. Your moment in the spotlight.",
  mission:
    "To give every entrepreneur access to the stage they deserve. We believe every founder has expertise worth sharing — and every story told well creates impact.",
  services: [
    "Speaking Events — Curated stages for entrepreneurs",
    "Authority Building — Position yourself as a thought leader",
    "Content Generation — Professional recordings of your talks",
    "Network Expansion — Connect with fellow founders",
    "Stage Presence Coaching — Deliver with confidence",
  ],
  formats: [
    "GrowBiz Talks Live — Signature speaking events",
    "Founder Spotlights — Individual authority-building sessions",
    "Panel Discussions — Multi-founder conversations",
    "Virtual Stages — Online speaking opportunities",
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/growbiztalks", label: "@growbiztalks" },
  ],
};

export default function GrowBizTalksPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-4 py-20 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {talksData.name}
          </h1>
          <p className="mb-12 text-2xl text-neutral-400">
            {talksData.tagline}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-neutral-300">{talksData.mission}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">What We Do</h2>
            <ul className="space-y-3">
              {talksData.services.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-violet-500">→</span>
                  <span className="text-neutral-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16 rounded-lg border border-violet-900/30 bg-violet-950/20 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Event Formats</h2>
            <ul className="space-y-2">
              {talksData.formats.map((format, index) => (
                <li key={index} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-violet-400">•</span>
                  <span>{format}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16 rounded-lg border border-violet-600/30 bg-gradient-to-br from-violet-900/20 to-purple-900/20 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Why Speak?</h2>
            <p className="mb-6 text-neutral-300">
              Your expertise deserves a platform. Speaking builds credibility,
              generates leads, and creates content that works for you 24/7. We
              handle production. You bring the expertise.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-lg bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              Apply to Speak →
            </a>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Follow GrowBiz Talks
            </h2>
            <SocialLinks links={talksData.socialLinks} />
          </div>

          <p className="mb-12 text-center text-lg italic text-neutral-500">
            Every founder deserves a stage.
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
