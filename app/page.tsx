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
  title: 'לזכרו של סמ"ר עמית פרידמן ז"ל',
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'עמית פרידמן',
  alternateName: 'Amit Friedman',
  birthDate: '2005-02-20',
  birthPlace: {
    '@type': 'Place',
    name: 'אור יהודה, ישראל',
  },
  deathDate: '2024-08-27',
  deathPlace: {
    '@type': 'Place',
    name: 'רפיח, רצועת עזה',
  },
  description:
    'סמ"ר עמית פרידמן ז"ל, לוחם בגדוד 932 חטיבת הנח"ל, נפל בקרב ברפיח ב-27 באוגוסט 2024 במהלך מלחמת חרבות ברזל.',
  nationality: 'ישראלי',
  image: '/about/AmitP.png',
  url: '/',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
