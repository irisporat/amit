'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import GalleryModal from '@/components/GalleryModal';
import './EventsSection.css';

const galleryData: Record<string, string[]> = {
  scouts: [
    '/events/scouts/zofim 1.jpeg',
    '/events/scouts/zofim 2.jpeg',
    '/events/scouts/zofim 3.jpeg',
    '/events/scouts/zofim actions 1.jpeg',
    '/events/scouts/zofim actions 2.jpeg',
    '/events/scouts/zofim hanuka 25.jpeg',
  ],
  memorial: ['/events/memorial day 2025.jpeg'],
  lecture: [
    '/events/lecture/DSC_2282.jpg',
    '/events/lecture/Rmember Amit 38.jpeg',
    '/events/lecture/Rmember Amit 41.jpeg',
    '/events/lecture/lecture1.jpeg',
  ],
  sport: [
    '/events/sport/Rmember Amit 17.jpeg',
    '/events/sport/Rmember Amit 33.jpeg',
    '/events/sport/Rmember Amit 34.jpeg',
    '/events/sport/Rmember Amit 35.jpeg',
    '/events/sport/Rmember Amit 36.jpeg',
    '/events/sport/Rmember Amit 39.jpeg',
    '/events/sport/Rmember Amit 40.jpeg',
    '/events/sport/Rmember Amit 42.jpeg',
    '/events/sport/Rmember Amit 58.jpeg',
    '/events/sport/Yuvalim team.jpeg',
    '/events/sport/basketball 25.jpeg',
    '/events/sport/מכבי.jpeg',
  ],
  birthday: [
    '/main/birthday.jpeg',
    '/events/birthday/Fridman.jpg',
    '/events/birthday/Rmember Amit 54.jpeg',
    '/events/birthday/Rmember Amit 56.jpeg',
    '/events/birthday/WhatsApp Image 2026-04-13 at 19.38.34.jpeg',
  ],
  others: [
    '/events/more events/IMG_7629.JPEG',
    '/events/more events/IMG_7645.JPEG',
    '/events/more events/IMG_7655.JPEG',
    '/events/more events/Rmember Amit 25.jpeg',
    '/events/more events/Rmember Amit 26.jpeg',
    '/events/more events/Rmember Amit 44.jpeg',
    '/events/more events/Rmember Amit 45.jpeg',
  ],
};

const eventCards = [
  { category: 'memorial', img: '/events/memorial day 2025.jpeg', label: 'ימי הזיכרון' },
  { category: 'lecture', img: '/events/lecture.jpg', label: 'הרצאות' },
  { category: 'scouts', img: '/events/scouts 1.jpeg', label: 'צופים' },
  { category: 'sport', img: '/events/basketball team.jpg', label: 'ספורט' },
  { category: 'birthday', img: '/main/birthday.jpeg', label: 'ימי הולדת בלעדיך' },
  { category: 'others', img: '/events/Lev.jpeg', label: 'ארועים נוספים' },
];

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => { setActiveCategory(category); setCurrentIndex(0); };
  const closeGallery = useCallback(() => setActiveCategory(null), []);
  const images = activeCategory ? (galleryData[activeCategory] ?? []) : [];
  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <section id="events" className="events-section">
      <div className="section-page-header">
        <h2>אירועי הנצחה</h2>
      </div>
      <div className="events-section-wrapper">
        <div className="events-cards-grid">
          {eventCards.map(({ category, img, label }) => (
            <a
              key={category}
              href="#"
              className="event-gallery-card"
              onClick={(e) => { e.preventDefault(); openGallery(category); }}
            >
              <div className="event-gallery-img-wrap">
                <Image src={img} alt={label} fill sizes="(max-width: 900px) 50vw, 33vw" className="event-gallery-img" />
              </div>
              <div className="event-gallery-label"><span>{label}</span></div>
            </a>
          ))}
        </div>
      </div>
      <GalleryModal
        isOpen={activeCategory !== null}
        images={images}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
