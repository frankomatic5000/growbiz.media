import { SocialLinks } from "@/components/SocialLinks";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
  title: "GrowBiz Studios — Professional Media Production",
  description:
    "GrowBiz Studios provides professional studio recording, course creation, podcast production, and teleprompter-assisted authority videos for entrepreneurs.",
};

const studiosData = {
  name: "GrowBiz Studios",
  tagline: "Professional Media Production",
  description:
    "Studio-grade content creation for entrepreneurs. Professional recording, podcast production, course creation, and authority videos — accessible to every founder.",
  mission:
    "To democratize access to professional media production. We believe every entrepreneur deserves studio-quality content without the studio prices.",
  services: [
    "Studio Recording — Professional video and audio capture",
    "Course Creation — Turn your expertise into sellable courses",
    "Podcast Production — Multi-camera recording and editing",
    "Teleprompter-Assisted Videos — Professional authority content",
    "Branding Sessions — Visual content that tells your story",
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/growbizstudios", label: "@growbizstudios" },
  ],
};

export default function GrowBizStudiosPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="px-4 py-20 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {studiosData.name}
          </h1>
          <p className="mb-12 text-2xl text-neutral-400">
            {studiosData.tagline}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-neutral-300">{studiosData.mission}</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">What We Do</h2>
            <ul className="space-y-3">
              {studiosData.services.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-amber-500">→</span>
                  <span className="text-neutral-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16 rounded-lg border border-amber-900/30 bg-amber-950/20 p-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Book a Studio Session
            </h2>
            <p className="mb-6 text-neutral-300">
              Ready to create professional content? Fill out the form below
              and our team will get in touch to schedule your session.
            </p>
            <LeadForm
              serviceType="growbiz_studio_video"
              source="studios_page"
            />
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Follow GrowBiz Studios
            </h2>
            <SocialLinks links={studiosData.socialLinks} />
          </div>

          <p className="mb-12 text-center text-lg italic text-neutral-500">
            Studio-grade quality. Entrepreneur prices.
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
