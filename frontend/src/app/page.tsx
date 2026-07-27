import { HeroSection } from "@/components/home/HeroSection"
import { StatsStrip } from "@/components/home/StatsStrip"
import { TechMarquee } from "@/components/home/TechMarquee"
import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { GlowDivider } from "@/components/ui/GlowDivider"
import { CTASection } from "@/components/home/CTASection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <StatsStrip />
      <GlowDivider />
      <FeaturedProjects />
      <GlowDivider color="teal" />
      <CTASection />
    </>
  )
}