import { SocialLinks } from "@/components/SocialLinks";

export const metadata = {
  title: "Imigrou TV — Video Stories of the Diaspora",
  description:
    "Imigrou TV is the video content arm of Imigrou, bringing Brazilian diaspora stories to life through long-form interviews and short-form content.",
};

const imigroutvData = {
  name: "Imigrou TV",
  tagline: "Video Stories of the Diaspora",
  description:
    "The video content arm of Imigrou. Long-form interviews, short-form stories, and everything in between. Real people, real cameras, real impact.",
  mission:
    "To bring the Brazilian diaspora experience to life through video. We don't just tell stories — we show them. The struggles, the triumphs, the everyday moments that make immigrant life what it is.",
  content: [
    "Long-Form Interviews — Deep conversations with community members",
    "Short-Form Content — YouTube Shorts, Instagram Reels, TikTok",
    "Documentary Series — Multi-episode explorations of diaspora themes",
    "Educational Content — Immigration tips, cultural navigation",
    "Community Spotlights — Local heroes and hidden gems",
  ],
  platforms: [
    { name: "YouTube", description: "Long-form interviews and series" },
    { name: "YouTube Shorts", description: "Quick stories, daily moments" },
    { name: "Instagram Reels", description: "Shareable snippets" },
    { name: "TikTok", description: "Viral potential content" },
  ],
  socialLinks: [
    { platform: "YouTube", url: "https://youtube.com/@imigroutv", label: "@imigroutv" },
  ],
  host: {
    name: "Karine",
    bio: "Director Executive turned storyteller. From Mapfre's boardroom to behind the camera. Ten years of diaspora experience distilled into every interview.",
  },
};

export default function ImigrouTVPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-4 py-20 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {imigroutvData.name}
          </h1>
          <p className="mb-12 text-2xl text-neutral-400">
            {imigroutvData.tagline}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-neutral-300">{imigroutvData.mission}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">What We Create</h2>
            <ul className="space-y-3">
              {imigroutvData.content.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500">→</span>
                  <span className="text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16 rounded-lg border border-red-900/30 bg-red-950/20 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Platforms</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {imigroutvData.platforms.map((platform, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-red-800/30 bg-red-900/10 p-4"
                >
                  <h3 className="mb-1 font-semibold text-red-400">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-neutral-400">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Production Quality</h2>
            <p className="text-neutral-300">
              Sony FX3. Professional lighting. Real editing. This isn&apos;t
              amateur hour — it&apos;s studio-grade content for community
              stories.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Subscribe to Imigrou TV
            </h2>
            <SocialLinks links={imigroutvData.socialLinks} />
          </div>

          <div className="mb-16 rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-semibold">About the Host</h2>
            <h3 className="mb-2 text-xl text-red-400">{imigroutvData.host.name}</h3>
            <p className="text-neutral-300">{imigroutvData.host.bio}</p>
          </div>

          <p className="mb-12 text-center text-lg italic text-neutral-500">
            The camera is just a tool. The relationship is the product.
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href="/imigrou"
              className="inline-block rounded-lg bg-neutral-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              ← Back to Imigrou
            </a>
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
