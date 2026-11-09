import { Navbar } from "@/components/irack/navbar";
import { Hero } from "@/components/irack/hero";
import { PartnersSection } from "@/components/irack/partners-marquee";
import { About } from "@/components/irack/about";
import { Solutions } from "@/components/irack/solutions";
import { WhyUs } from "@/components/irack/why-us";
import { Projects } from "@/components/irack/projects";
import { Team } from "@/components/irack/team";
import { Clients } from "@/components/irack/clients";
import { CTABanner } from "@/components/irack/cta-banner";
import { Contact } from "@/components/irack/contact";
import { Footer } from "@/components/irack/footer";
import { ScrollProgress } from "@/components/irack/scroll-progress";
import { BackToTop } from "@/components/irack/back-to-top";
import { ChatWidget } from "@/components/irack/chat-widget";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PartnersSection />
        <About />
        <Solutions />
        <Projects />
        <WhyUs />
        <Team />
        <Clients />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </div>
  );
}
