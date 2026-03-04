import { Hero } from '@/components/hub/Hero'
import { BrandStatement } from '@/components/hub/BrandStatement'
import { AboutSnippet } from '@/components/hub/AboutSnippet'
import { SubsidiariesGrid } from '@/components/hub/SubsidiariesGrid'
import { MissionPillars } from '@/components/hub/MissionPillars'
import { ImpactNumbers } from '@/components/hub/ImpactNumbers'
import { MagazineCallout } from '@/components/hub/MagazineCallout'
import { CTABanner } from '@/components/hub/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <AboutSnippet />
      <SubsidiariesGrid />
      <MissionPillars />
      <ImpactNumbers />
      <MagazineCallout />
      <CTABanner />
    </>
  )
}
