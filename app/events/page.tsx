'use client';

import { useState, useCallback } from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import GalleryModal from '@/components/GalleryModal';
import BodyClass from '@/components/BodyClass';
import '@/styles/events.css';

const galleryData: Record<string, string[]> = {
  scouts: [
    '/images/events/scouts/zofim 1.jpeg',
    '/images/events/scouts/zofim 2.jpeg',
    '/images/events/scouts/zofim 3.jpeg',
    '/images/events/scouts/zofim actions 1.jpeg',
    '/images/events/scouts/zofim actions 2.jpeg',
    '/images/events/scouts/zofim hanuka 25.jpeg',
  ],
  memorial: ['/images/events/memorial day 2025.jpeg'],
  lecture: [
    '/images/events/lecture/DSC_2282.jpg',
    '/images/events/lecture/Rmember Amit 38.jpeg',
    '/images/events/lecture/Rmember Amit 41.jpeg',
    '/images/events/lecture/lecture1.jpeg',
  ],
  sport: [
    '/images/events/sport/Rmember Amit 17.jpeg',
    '/images/events/sport/Rmember Amit 33.jpeg',
    '/images/events/sport/Rmember Amit 34.jpeg',
    '/images/events/sport/Rmember Amit 35.jpeg',
    '/images/events/sport/Rmember Amit 36.jpeg',
    '/images/events/sport/Rmember Amit 39.jpeg',
    '/images/events/sport/Rmember Amit 40.jpeg',
    '/images/events/sport/Rmember Amit 42.jpeg',
    '/images/events/sport/Rmember Amit 58.jpeg',
    '/images/events/sport/Yuvalim team.jpeg',
    '/images/events/sport/basketball 25.jpeg',
    '/images/events/sport/מכבי.jpeg',
  ],
  birthday: [
    '/images/main/birthday.jpeg',
    '/images/events/birthday/Fridman.jpg',
    '/images/events/birthday/Rmember Amit 54.jpeg',
    '/images/events/birthday/Rmember Amit 56.jpeg',
    '/images/events/birthday/WhatsApp Image 2026-04-13 at 19.38.34.jpeg',
  ],
  others: [
    '/images/events/more events/IMG_7629.JPEG',
    '/images/events/more events/IMG_7645.JPEG',
    '/images/events/more events/IMG_7655.JPEG',
    '/images/events/more events/Rmember Amit 25.jpeg',
    '/images/events/more events/Rmember Amit 26.jpeg',
    '/images/events/more events/Rmember Amit 44.jpeg',
    '/images/events/more events/Rmember Amit 45.jpeg',
  ],
};

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => { setActiveCategory(category); setCurrentIndex(0); };
  const closeGallery = useCallback(() => setActiveCategory(null), []);
  const images = activeCategory ? (galleryData[activeCategory] ?? []) : [];
  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <>
      <BodyClass className="events-page" />
      <div id="navigation-root">
        <Navigation pageTitle="אירועי הנצחה" />
      </div>
      <main className="main-content-scroll">
        <div className="events-page-wrapper">
          <div className="events-grid">
            {[
              { category: 'memorial', img: '/images/events/memorial day 2025.jpeg', label: 'ימי הזיכרון' },
              { category: 'lecture', img: '/images/events/lecture.jpg', label: 'הרצאות' },
              { category: 'scouts', img: '/images/events/scouts 1.jpeg', label: 'צופים' },
              { category: 'sport', img: '/images/events/basketball team.jpg', label: 'ספורט' },
              { category: 'birthday', img: '/images/main/birthday.jpeg', label: 'ימי הולדת בלעדיך' },
              { category: 'others', img: '/images/events/Lev.jpeg', label: 'ארועים נוספים' },
            ].map(({ category, img, label }) => (
              <a
                key={category}
                href="#"
                className="event-card"
                data-category={category}
                onClick={(e) => { e.preventDefault(); openGallery(category); }}
              >
                <img src={img} alt={label} className="event-card-img" />
                <div className="event-card-label"><span>{label}</span></div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <GalleryModal
        isOpen={activeCategory !== null}
        images={images}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
