import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
  title: "Imigrou — Stories of the Brazilian Diaspora",
  description:
    "Imigrou amplifies the voices of Brazilian immigrants navigating life in the United States. Real stories, real community, real belonging.",
};

const imigrouData = {
  name: "Imigrou",
  tagline: "Stories of the Brazilian Diaspora",
  description:
    "A media channel dedicated to the lives of Brazilians navigating the world from the outside in. Real immigration journeys. Real cultural identity. Real community.",
  mission:
    "To create a mirror that reflects the Brazilian diaspora back to itself — with dignity, humor, and truth. We believe immigrant stories are not niche. They are universal.",
  services: [
    "Interviews — Real people, real stories. Not celebrities. Community.",
    "Cultural Identity — Navigating life between two worlds",
    "Immigration Journeys — The complexity of starting over",
    "Entrepreneurship — Building businesses across borders",
    "Family & Life — The everyday reality of diaspora living",
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/imigrou", label: "@imigrou" },
    { platform: "YouTube", url: "https://youtube.com/@imigroutv", label: "@imigroutv" },
  ],
  host: {
    name: "Karine",
    bio: "Brazilian-born media personality, entrepreneur, and storyteller. After a decade as Director Executive at Mapfre in Brazil, she traded the boardroom for a camera to build something meaningful from New Jersey.",
  },
};

export default function ImigrouPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-4 py-20 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {imigrouData.name}
          </h1>
          <p className="mb-12 text-2xl text-neutral-400">
            {imigrouData.tagline}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-neutral-300">{imigrouData.mission}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">What We Do</h2>
            <ul className="space-y-3">
              {imigrouData.services.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-emerald-500">→</span>
                  <span className="text-neutral-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Follow Imigrou</h2>
            <SocialLinks links={imigrouData.socialLinks} />
          </div>

          <div className="mb-16 rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-semibold">About the Host</h2>
            <h3 className="mb-2 text-xl text-emerald-400">
              {imigrouData.host.name}
            </h3>
            <p className="text-neutral-300">{imigrouData.host.bio}</p>
          </div>

          <p className="mb-12 text-center text-lg italic text-neutral-500">
            The goal was never fame. The goal was always belonging.
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
