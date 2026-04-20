'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Wrench } from 'lucide-react';
import GalleryModal from '@/components/GalleryModal';
import './RememberSection.css';

const galleryData: Record<string, string[]> = {
  stickers: [
    '/Remember/Stickers/Rmember%20Amit%2013.jpeg',
    '/Remember/Stickers/Rmember%20Amit%2018.jpeg',
    '/Remember/Stickers/Rmember%20Amit%2019.jpeg',
    '/Remember/Stickers/Rmember%20Amit%2021.jpeg',
    '/Remember/Stickers/Rmember%20Amit%203.jpeg',
    '/Remember/Stickers/Rmember%20Amit%2031.jpeg',
    '/Remember/Stickers/Rmember%20Amit%2032.jpeg',
    '/Remember/Stickers/Rmember%20Amit%204.jpeg',
    '/Remember/Stickers/Rmember%20Amit%2049.jpeg',
    '/Remember/Stickers/Rmember%20Amit%205.jpeg',
  ],
  memorial: [
    '/Remember/memorial/Rmember%20Amit%2010.jpeg',
    '/Remember/memorial/Rmember%20Amit%2011.jpeg',
    '/Remember/memorial/Rmember%20Amit%2012.jpeg',
    '/Remember/memorial/Rmember%20Amit%2020.jpeg',
    '/Remember/memorial/Rmember%20Amit%2022.jpeg',
    '/Remember/memorial/Rmember%20Amit%2046.jpeg',
    '/Remember/memorial/Rmember%20Amit%2048.jpeg',
    '/Remember/memorial/Rmember%20Amit%2053.jpeg',
    '/Remember/memorial/Rmember%20Amit%2065.jpeg',
    '/Remember/memorial/Rmember%20Amit%208.jpeg',
    '/Remember/memorial/Rmember%20Amit%209.jpeg',
    '/Remember/memorial/WhatsApp%20Image%202026-04-13%20at%2019.38.34%20(1).jpeg',
    '/Remember/memorial/%D7%94%D7%A0%D7%A6%D7%97%D7%94%20%D7%A2%D7%98.jpeg',
    '/Remember/memorial/%D7%A6%D7%99%D7%95%D7%A8%20%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F.jpeg',
  ],
  journey: [
    '/Remember/journey/Rmember%20Amit%2014.jpeg',
    '/Remember/journey/Rmember%20Amit%202.jpeg',
    '/Remember/journey/Rmember%20Amit%2024.jpeg',
    '/Remember/journey/Rmember%20Amit%2027.jpeg',
    '/Remember/journey/Rmember%20Amit%2028.jpeg',
    '/Remember/journey/Rmember%20Amit%2047.jpeg',
    '/Remember/journey/Rmember%20Amit%2064.jpeg',
    '/Remember/journey/Rmember%20Amit%207.jpeg',
  ],
  others: [
    '/events/more%20events/IMG_7629.JPEG',
    '/events/more%20events/IMG_7645.JPEG',
    '/events/more%20events/IMG_7655.JPEG',
    '/events/more%20events/Rmember%20Amit%2025.jpeg',
    '/events/more%20events/Rmember%20Amit%2026.jpeg',
    '/events/more%20events/Rmember%20Amit%2044.jpeg',
    '/events/more%20events/Rmember%20Amit%2045.jpeg',
    '/Remember/shows/Rmember%20Amit%2057.jpeg',
    '/Remember/shows/Rmember%20Amit%2059.jpeg',
    '/Remember/shows/Rmember%20Amit%2063.jpeg',
  ],
  lessons: [],
  songs: [],
};

const rememberCards = [
  { category: 'stickers', img: '/Remember/Stickers/Rmember%20Amit%2031.jpeg', label: 'עמית מסביב לעולם' },
  { category: 'memorial', img: '/Remember/memorial/Rmember%20Amit%209.jpeg', label: 'מנציחים אותך' },
  { category: 'journey', img: '/Remember/journey/Rmember%20Amit%2014.jpeg', label: 'מסעות' },
  { category: 'lessons', img: '/events/more%20events/event3.jpeg', label: 'מערכי שיעור' },
  { category: 'songs', img: '/Remember/%D7%A2%D7%9E%D7%99%D7%AA%20%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F%202.jpeg', label: 'שירים וסרטים' },
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
