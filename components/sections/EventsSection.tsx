'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import GalleryModal from '@/components/GalleryModal';
import VideoModal from '@/components/VideoModal';
import './EventsSection.css';

const galleryData: Record<string, string[]> = {
  scouts: [
    '/events/scouts/zofim%201.jpeg',
    '/events/scouts/zofim%202.jpeg',
    '/events/scouts/zofim%203.jpeg',
    '/events/scouts/zofim%20actions%201.jpeg',
    '/events/scouts/zofim%20actions%202.jpeg',
    '/events/scouts/zofim%20hanuka%2025.jpeg',
    '/events/scouts/zofim1.jpeg',
    '/events/scouts/zofim2.jpeg',
    '/events/scouts/zofim3.jpeg',
    '/events/scouts/zofim4.jpeg',
  ],
  memorial_services: [
    '/events/Memorial%20Day/DSC_1077.jpg',
    '/events/Memorial%20Day/DSC_1275.jpg',
    '/events/Memorial%20Day/DSC_1424.jpg',
    '/events/Memorial%20Day/DSC_1479.jpg',
    '/events/Memorial%20Day/DSC_1957.jpg',
    '/events/Memorial%20Day/DSC_2612.jpg',
    '/events/Memorial%20Day/DSC_2664.jpg',
    '/events/Memorial%20Day/%D7%9C%D7%91%20%D7%95%D7%A4%D7%A8%D7%97%D7%99%D7%9D.jpeg',
  ],
  memorial: [
    '/events/memorial%20day%202025.jpeg',
    '/events/Memorial%20evening/DSC_7932.jpg',
    '/events/Memorial%20evening/DSC_7949.jpg',
    '/events/Memorial%20evening/DSC_8117.jpg',
    '/events/Memorial%20evening/DSC_8339.jpg',
    '/events/Memorial%20evening/z1.jpeg',
    '/events/Memorial%20evening/z2.jpeg',
    '/events/Memorial%20evening/z3.jpeg',
    '/events/Memorial%20evening/z4.jpeg',
  ],
  lecture: [
    '/events/lecture/DSC_2282.jpg',
    '/events/lecture/Rmember Amit 38.jpeg',
    '/events/lecture/Rmember Amit 41.jpeg',
    '/events/lecture/lecture1.jpeg',
    '/events/lecture/h1.jpeg',
  ],
  sport: [
    '/events/sport/macabia.jpeg',
    '/events/sport/macabia%20-2.jpeg',
    '/events/sport/Basketball%2011.6.26-1.jpeg',
    '/events/sport/Football%2011.6.26%20-1.jpeg',
    '/events/sport/Football%2011.6.26%20-2.jpeg',
    '/events/sport/Football%2011.6.26%20-3.jpeg',
    '/events/sport/Rmember%20Amit%2017.jpeg',
    '/events/sport/Rmember%20Amit%2033.jpeg',
    '/events/sport/Rmember%20Amit%2034.jpeg',
    '/events/sport/Rmember%20Amit%2035.jpeg',
    '/events/sport/Rmember%20Amit%2036.jpeg',
    '/events/sport/Rmember%20Amit%2039.jpeg',
    '/events/sport/Rmember%20Amit%2040.jpeg',
    '/events/sport/Rmember%20Amit%2042.jpeg',
    '/events/sport/Rmember%20Amit%2058.jpeg',
    '/events/sport/Yuvalim%20team.jpeg',
    '/events/sport/basketball%2025.jpeg',
    '/events/sport/%D7%9E%D7%9B%D7%91%D7%99.jpeg',
    '/events/sport/s1.jpeg',
    '/events/sport/s2.jpeg',
    '/events/sport/s3.jpeg',
    '/events/sport/s4.jpeg',
    '/events/sport/s5.jpeg',
    '/events/sport/s6.jpeg',
  ],
  birthday: [
    '/main/birthday.jpeg',
    '/events/birthday/Fridman.jpg',
    '/events/birthday/Rmember Amit 54.jpeg',
    '/events/birthday/Rmember Amit 56.jpeg',
    '/events/birthday/WhatsApp Image 2026-04-13 at 19.38.34.jpeg',
    '/events/birthday/b1.jpeg',
    '/events/birthday/b2.jpeg',
    '/events/birthday/b3.jpeg',
    '/events/birthday/b4.jpeg',
    '/events/birthday/b5.jpeg',
    '/events/birthday/b6.jpeg',
    '/events/birthday/b7.jpeg',
  ],
};

const eventCards = [
  { category: 'memorial_services', img: '/events/Memorial%20Day/DSC_1077.jpg', label: 'אזכרות' },
  { category: 'memorial', img: '/events/memorial%20day%202025.jpeg', label: 'ימי הזיכרון' },
  { category: 'lecture', img: '/events/lecture/h1.jpeg', label: 'הרצאות' },
  { category: 'scouts', img: '/events/scouts%201.jpeg', label: 'צופים' },
  { category: 'sport', img: '/events/basketball%20team.jpg', label: 'ספורט' },
  { category: 'birthday', img: '/main/birthday.jpeg', label: 'ימי הולדת בלעדיך' },
];

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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
        <div className="event-featured-card-wrapper">
          <a
            href="#"
            className="event-gallery-card featured-event-card"
            onClick={(e) => { e.preventDefault(); setIsVideoModalOpen(true); }}
          >
            <div className="event-gallery-img-wrap">
              <Image 
                src="/events/memorial day 2026.jpeg" 
                alt="שרים וזוכרים - יום הזיכרון תשפ&quot;ו" 
                fill 
                sizes="(max-width: 900px) 100vw, 400px" 
                className="event-gallery-img" 
              />
              <div className="play-overlay">
                <div className="play-icon-circle">
                  <div className="play-triangle"></div>
                </div>
              </div>
            </div>
            <div className="event-gallery-label featured-label">
              <span>שרים וזוכרים<br />יום הזיכרון תשפ&quot;ו</span>
            </div>
          </a>
        </div>

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
      <VideoModal
        isOpen={isVideoModalOpen}
        videoUrl="https://www.youtube.com/watch?v=LeBBFsKYUTw"
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  );
}
