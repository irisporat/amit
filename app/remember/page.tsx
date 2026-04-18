'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import GalleryModal from '@/components/GalleryModal';
import BodyClass from '@/components/BodyClass';
import './remember.css';

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
  shows: [
    '/Remember/shows/Rmember Amit 57.jpeg',
    '/Remember/shows/Rmember Amit 59.jpeg',
    '/Remember/shows/Rmember Amit 63.jpeg',
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
};

export default function RememberPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => { setActiveCategory(category); setCurrentIndex(0); };
  const closeGallery = useCallback(() => setActiveCategory(null), []);
  const images = activeCategory ? (galleryData[activeCategory] ?? []) : [];
  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <>
      <BodyClass className="remember-page" />
      <div id="navigation-root">
        <Navigation pageTitle="זוכרים אותך" />
      </div>
      <main className="main-content-scroll">
        <div className="remember-page-wrapper">
          <div className="remember-grid">
            {[
              { category: 'stickers', img: '/Remember/Stickers/Rmember Amit 31.jpeg', label: 'עמית מסביב לעולם' },
              { category: 'memorial', img: '/Remember/memorial/Rmember Amit 9.jpeg', label: 'פינות הנצחה' },
              { category: 'shows', img: '/Remember/shows/Rmember Amit 59.jpeg', label: 'הופעות' },
              { category: 'journey', img: '/Remember/journey/Rmember Amit 14.jpeg', label: 'מסעות' },
            ].map(({ category, img, label }) => (
              <a
                key={category}
                href="#"
                className="remember-card"
                onClick={(e) => { e.preventDefault(); openGallery(category); }}
              >
                <div className="remember-card-img-wrap">
                  <Image src={img} alt={label} fill sizes="(max-width: 900px) 50vw, 33vw" className="remember-card-img" />
                </div>
                <div className="remember-card-label"><span>{label}</span></div>
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
