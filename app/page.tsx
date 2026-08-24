import { TopBar } from "@/components/site/top-bar";
import { Hero } from "@/components/site/hero";
import { Problems } from "@/components/site/problems";
import { Features } from "@/components/site/features";
import { Steps } from "@/components/site/steps";
import { Pricing } from "@/components/site/pricing";
import { LeadForm } from "@/components/site/lead-form";
import { SiteFooter } from "@/components/site/site-footer";

export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Problems />
        <Features />
        <Steps />
        <Pricing />
        <LeadForm />
      </main>
      <SiteFooter />
    </>
  );
}
