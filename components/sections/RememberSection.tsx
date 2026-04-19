'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Wrench } from 'lucide-react';
import GalleryModal from '@/components/GalleryModal';
import './RememberSection.css';

const galleryData: Record<string, string[]> = {
  stickers: [
    '/Remember/Stickers/Rmember Amit 13.jpeg',
    '/Remember/Stickers/Rmember Amit 18.jpeg',
    '/Remember/Stickers/Rmember Amit 19.jpeg',
    '/Remember/Stickers/Rmember Amit 21.jpeg',
    '/Remember/Stickers/Rmember Amit 3.jpeg',
    '/Remember/Stickers/Rmember Amit 31.jpeg',
    '/Remember/Stickers/Rmember Amit 32.jpeg',
    '/Remember/Stickers/Rmember Amit 4.jpeg',
    '/Remember/Stickers/Rmember Amit 49.jpeg',
    '/Remember/Stickers/Rmember Amit 5.jpeg',
  ],
  memorial: [
    '/Remember/memorial/Rmember Amit 10.jpeg',
    '/Remember/memorial/Rmember Amit 11.jpeg',
    '/Remember/memorial/Rmember Amit 12.jpeg',
    '/Remember/memorial/Rmember Amit 20.jpeg',
    '/Remember/memorial/Rmember Amit 22.jpeg',
    '/Remember/memorial/Rmember Amit 46.jpeg',
    '/Remember/memorial/Rmember Amit 48.jpeg',
    '/Remember/memorial/Rmember Amit 53.jpeg',
    '/Remember/memorial/Rmember Amit 65.jpeg',
    '/Remember/memorial/Rmember Amit 8.jpeg',
    '/Remember/memorial/Rmember Amit 9.jpeg',
    '/Remember/memorial/WhatsApp Image 2026-04-13 at 19.38.34 (1).jpeg',
    '/Remember/memorial/הנצחה עט.jpeg',
    '/Remember/memorial/ציור פרידמן.jpeg',
  ],
  journey: [
    '/Remember/journey/Rmember Amit 14.jpeg',
    '/Remember/journey/Rmember Amit 2.jpeg',
    '/Remember/journey/Rmember Amit 24.jpeg',
    '/Remember/journey/Rmember Amit 27.jpeg',
    '/Remember/journey/Rmember Amit 28.jpeg',
    '/Remember/journey/Rmember Amit 47.jpeg',
    '/Remember/journey/Rmember Amit 64.jpeg',
    '/Remember/journey/Rmember Amit 7.jpeg',
  ],
  others: [
    '/events/more events/IMG_7629.JPEG',
    '/events/more events/IMG_7645.JPEG',
    '/events/more events/IMG_7655.JPEG',
    '/events/more events/Rmember Amit 25.jpeg',
    '/events/more events/Rmember Amit 26.jpeg',
    '/events/more events/Rmember Amit 44.jpeg',
    '/events/more events/Rmember Amit 45.jpeg',
    '/Remember/shows/Rmember Amit 57.jpeg',
    '/Remember/shows/Rmember Amit 59.jpeg',
    '/Remember/shows/Rmember Amit 63.jpeg',
  ],
  lessons: [],
  songs: [],
};

const rememberCards = [
  { category: 'stickers', img: '/Remember/Stickers/Rmember Amit 31.jpeg', label: 'עמית מסביב לעולם' },
  { category: 'memorial', img: '/Remember/memorial/Rmember Amit 9.jpeg', label: 'מנציחים אותך' },
  { category: 'journey', img: '/Remember/journey/Rmember Amit 14.jpeg', label: 'מסעות' },
  { category: 'lessons', img: '/Remember/memorial/ציור פרידמן.jpeg', label: 'מערכי שיעור' },
  { category: 'songs', img: '/Remember/עמית פרידמן 2.jpeg', label: 'שירים וסרטים' },
  { category: 'others', img: '/events/Lev.jpeg', label: 'הנצחות נוספות' },
];

export default function RememberSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeComingSoon, setActiveComingSoon] = useState<string | null>(null);

  const openGallery = (category: string) => {
    if (category === 'lessons' || category === 'songs') {
      setActiveComingSoon(category);
      setTimeout(() => setActiveComingSoon(null), 3000);
      return;
    }
    setActiveCategory(category);
    setCurrentIndex(0);
  };
  const closeGallery = useCallback(() => setActiveCategory(null), []);
  const images = activeCategory ? (galleryData[activeCategory] ?? []) : [];
  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <section id="remember" className="remember-section">
      <div className="section-page-header">
        <h2>זוכרים אותך עמית</h2>
      </div>
      <div className="remember-section-wrapper">
        <div className="remember-cards-grid">
          {rememberCards.map(({ category, img, label }) => (
            <a
              key={category}
              href="#"
              className="remember-gallery-card"
              onClick={(e) => { e.preventDefault(); openGallery(category); }}
            >
              <div className="remember-gallery-img-wrap">
                <Image src={img} alt={label} fill sizes="(max-width: 900px) 50vw, 33vw" className="remember-gallery-img" />
                {activeComingSoon === category && (
                  <div className="coming-soon-overlay">
                    <Wrench size={18} className="coming-soon-icon" />
                    <span>יעודכן בהמשך</span>
                  </div>
                )}
              </div>
              <div className="remember-gallery-label"><span>{label}</span></div>
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
