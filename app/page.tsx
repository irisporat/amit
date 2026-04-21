import type { Metadata } from 'next';
import ScrollToSection from '@/components/ScrollToSection';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BraverySection from '@/components/sections/BraverySection';
import CoffeeSection from '@/components/sections/CoffeeSection';
import EventsSection from '@/components/sections/EventsSection';
import RememberSection from '@/components/sections/RememberSection';
import SentencesSection from '@/components/sections/SentencesSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://amitfriedman.co.il/';

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

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'בית',
      item: siteUrl,
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ScrollToSection />
      <main>
        <HeroSection />
        <AboutSection />
        <BraverySection />
        <CoffeeSection />
        <EventsSection />
        <RememberSection />
        {/* <NewsSection /> */}
        {/* <ContactSection /> */}
        <SentencesSection />
      </main>
    </>
  );
}
