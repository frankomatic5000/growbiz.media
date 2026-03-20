import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
  title: "GrowBiz Magazine — Stories That Shape Business",
  description:
    "GrowBiz Magazine amplifies multicultural business leaders, women founders, and global entrepreneurs through editorial storytelling.",
};

const magazineData = {
  name: "GrowBiz Magazine",
  tagline: "Stories That Shape Business",
  description:
    "A digital publication for immigrant entrepreneurs and multicultural leaders. Editorial precision meets authentic voices. Real impact, real stories, real business growth.",
  mission:
    "To give multicultural business leaders the editorial platform they deserve. We believe every entrepreneur has a story worth telling — and every story deserves excellence.",
  coverage: [
    "Immigrant Entrepreneurship — Origin stories that inspire",
    "Women Founders — Breaking barriers in business",
    "Global Leadership — Cross-border business strategy",
    "AI & Technology — Tools that multiply human effort",
    "Legacy Building — Businesses that outlast the hustle",
  ],
  socialLinks: [
    { platform: "Website", url: "https://growbizmagazine.com", label: "growbizmagazine.com" },
    { platform: "Instagram", url: "https://instagram.com/growbizmagazine", label: "@growbizmagazine" },
  ],
};

export default function GrowBizMagazinePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-4 py-20 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {magazineData.name}
          </h1>
          <p className="mb-12 text-2xl text-neutral-400">
            {magazineData.tagline}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-neutral-300">{magazineData.mission}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">What We Cover</h2>
            <ul className="space-y-3">
              {magazineData.coverage.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-amber-500">→</span>
                  <span className="text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16 rounded-lg border border-amber-900/30 bg-amber-950/20 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Get Featured</h2>
            <p className="mb-6 text-neutral-300">
              GrowBiz Magazine amplifies multicultural business leaders, women
              founders, and global entrepreneurs. Tell your story to thousands
              of readers who are building the future of business.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-lg bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-500"
            >
              Apply to Be Featured →
            </a>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Follow GrowBiz Magazine
            </h2>
            <SocialLinks links={magazineData.socialLinks} />
          </div>

          <div className="mb-12 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-amber-400">
              Editorial Standards
            </h3>
            <p className="text-neutral-400">
              Every article is AI-assisted but human-reviewed. Authenticity is
              our competitive advantage, not a compromise. We don&apos;t do
              corporate speak. We do real stories.
            </p>
          </div>

          <p className="mb-12 text-center text-lg italic text-neutral-500">
            Premium quality shouldn&apos;t require a corporate budget.
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
