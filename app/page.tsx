import type { Metadata } from 'next';
import ScrollToSection from '@/components/ScrollToSection';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BraverySection from '@/components/sections/BraverySection';
import EventsSection from '@/components/sections/EventsSection';
import RememberSection from '@/components/sections/RememberSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'החברים של עמית',
};

export default function HomePage() {
  return (
    <>
      <ScrollToSection />
      <main>
        <HeroSection />
        <AboutSection />
        <BraverySection />
        <EventsSection />
        <RememberSection />
        <NewsSection />
        <ContactSection />
      </main>
    </>
  );
}
