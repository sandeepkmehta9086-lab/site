import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Journey } from "@/components/Journey";
import { Expertise } from "@/components/Expertise";
import { Portfolio } from "@/components/Portfolio";
import { LinkedInFeed } from "@/components/LinkedInFeed";
import { Contact, Footer } from "@/components/Contact";
import { Spotlight } from "@/components/Spotlight";
import { DigitalTwin } from "@/components/DigitalTwin";

export default function Home() {
  return (
    <main className="relative">
      <Spotlight />
      <Nav />
      <Hero />
      <Marquee />
      <Journey />
      <Expertise />
      <Portfolio />
      <LinkedInFeed />
      <Contact />
      <Footer />
      <DigitalTwin />
    </main>
  );
}
