'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import GalleryModal from '@/components/GalleryModal';
import CoffeeHeroVideo from '@/components/CoffeeHeroVideo';
import './CoffeeSection.css';

const galleryData: Record<string, string[]> = {
  fam: [
    '/coffee/CoffeeFam/%D7%9E%D7%A4%D7%95%D7%A8%D7%A1%D7%9E%D7%99%D7%9D.jpeg',
    '/coffee/CoffeeFam/DSC_1403.jpg',
    '/coffee/CoffeeFam/%D7%9C%D7%99%D7%90%D7%AA%20%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F%20%D7%95%D7%A9%D7%97%D7%A8%20%D7%97%D7%99%D7%95%D7%9F%2C%20%D7%91%D7%A4%D7%A1%D7%9C%20%D7%94%D7%9C%D7%91%20%D7%9C%D7%96%D7%9B%D7%A8%D7%95%20%D7%A9%D7%9C%20%D7%A2%D7%9E%D7%99%D7%AA%20%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F.jpeg',
    '/coffee/CoffeeFam/%D7%9E%D7%94%20%D7%A7%D7%A9%D7%95%D7%A8%20%D7%91%D7%A2%D7%92%D7%9C%D7%94.jpeg',
    '/coffee/CoffeeFam/%D7%A2%D7%92%D7%9C%D7%94%20%D7%A2%D7%9D%20%D7%9C%D7%99%D7%90%D7%AA%20%D7%A9%D7%95%D7%97%D7%98.jpeg',
  ],
  pic: [
    '/coffee/CoffeePIC/%D7%9B%D7%95%D7%A1%20%D7%9E%D7%A2%D7%95%D7%A6%D7%91%D7%AA%20%D7%9E%D7%97%D7%99%D7%99%D7%9B%D7%AA.jpeg',
    '/coffee/CoffeePIC/CoffeePic1.jpeg',
    '/coffee/CoffeePIC/DSC_5887.jpg',
    '/coffee/CoffeePIC/IMG_9418.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 15.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 29.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 50.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 60.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 62.jpeg',
    '/coffee/CoffeePIC/WhatsApp Image 2026-04-13 at 19.38.33.jpeg',
    '/coffee/CoffeePIC/wine.jpeg',
    '/coffee/CoffeePIC/%D7%9C%D7%91%20%D7%91%D7%9B%D7%99%D7%9B%D7%A8.jpeg',
    '/coffee/CoffeePIC/%D7%9E%D7%A4%D7%99%D7%AA%20%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D.jpeg',
    '/coffee/CoffeePIC/%D7%A7%D7%A4%D7%94%20%D7%94%D7%97%D7%91%D7%A8%D7%99%D7%9D%20%D7%A9%D7%9C%20%D7%A2%D7%9E%D7%99%D7%AA%20%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%99%D7%97%D7%A6%20(1).jpg',
    '/coffee/CoffeePIC/%D7%A7%D7%A4%D7%94%20%D7%94%D7%97%D7%91%D7%A8%D7%99%D7%9D%20%D7%A9%D7%9C%20%D7%A2%D7%9E%D7%99%D7%AA%20%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%A0%D7%98%D7%9C%D7%99%20%D7%91%D7%95%D7%92%D7%A0%D7%94.jpg',
  ],
  event: [
    '/coffee/CoffeeEvent/IMG_7735.JPEG',
    '/coffee/CoffeeEvent/7f351100-6fed-40e2-89ec-ec2314840e5a.jpg',
    '/coffee/CoffeeEvent/IMG_8861.JPEG',
    '/coffee/CoffeeEvent/WhatsApp Image 2026-04-13 at 19.38.34.jpeg',
  ],
};

export default function CoffeeSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => { setActiveCategory(category); setCurrentIndex(0); };
  const closeGallery = useCallback(() => setActiveCategory(null), []);
  const images = activeCategory ? (galleryData[activeCategory] ?? []) : [];
  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <section id="coffee" className="coffee-section-wrapper">
      <div className="coffee-main-container">

        <div className="coffee-main-grid">
          {/* ── Row 1: Hero Image | Title & Description ── */}
          <div className="coffee-image-zone desktop-only">
            <Image
              src="/coffee/CoffeePIC/CoffeePic1.jpeg"
              alt="עגלת הקפה של עמית"
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="coffee-hero-img"
              priority
            />
          </div>

          <div className="coffee-info-zone">
            <div className="coffee-title-with-logo">
              <Image
                src="/main/%D7%9C%D7%95%D7%92%D7%95%20%D7%A2%D7%92%D7%9C%D7%94%20%D7%9C%D7%91%D7%9F.png"
                alt="לוגו קפה החברים של עמית"
                width={90}
                height={90}
                sizes="90px"
                className="coffee-logo-img"
                priority
              />
              <h2 className="coffee-main-title">עגלת &quot;קפה החברים של עמית&quot;</h2>
            </div>
            <div className="coffee-description">
              <p>
                עגלת &ldquo;קפה החברים של עמית&rdquo; הוקמה לזכרו של סמ״ר עמית פרידמן ז״ל, שנפל בקרב בתל סולטן שברפיח ב־27 באוגוסט 2024, בגיל 19.{' '}
              </p>
              <p>העגלה פועלת ביוזמה קהילתית מדי יום שישי בנווה סביון שבאור יהודה. תושבי השכונה מתנדבים, אופים ומגישים קפה, מאפים ומשקאות, עוגיות אמסטרדם ייחודיות, סמבוסק, מילקשייק ועוד כאשר כל ההכנסות מוקדשות להנצחתו.</p>
              <p>
                המיזם נולד מהרגעים הפשוטים שעמית אהב יותר מכל: לשבת עם חברים, לשוחח, לצחוק ולהיות יחד.{' '}
                <br />
                כשעמית היה יוצא מהצבא נהג לפקוד את בתי הקפה באזור ולפגוש חברים ממעגלים שונים.
              </p>
              <p>
                &ldquo;קפה החברים של עמית&rdquo; ממשיך לספר את סיפורו, אהבת האדם, השמחה והחברות והופך לזיכרון ולחיבור חם בקהילה.
                <br />
                מיזם של קהילה שלמה שלוקחת חלק בלהשאיר את עמית נוכח ולהנציח את האדם שהיה והאור שהפיץ.
              </p>
              <p>
                <strong>העגלה פועלת בכל יום שישי בין השעות 10:00–13:00, ברחוב דקל 11 פינת חיים בר־לב, נווה סביון, אור יהודה (חפשו ב-Waze: קפה החברים של עמית – עגלת קפה)</strong>
                <a
                  href="https://www.instagram.com/amits_friends_cafe?igsh=MWQ5cXd2b3RmMndkcw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coffee-insta-link"
                >
                  <Image
                    src="/main/instegram.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="coffee-insta-icon"
                  />
                </a>
              </p>
            </div>
          </div>

          {/* ── Row 2: Video | Button & Grid ── */}
          <div className="coffee-video-zone">
            <CoffeeHeroVideo />
          </div>

          <div className="coffee-cta-grid-zone">
            <Link href="/coffee/recipe" className="coffee-recipe-btn unified-btn">
              <BookOpen />
              <div className="btn-text-content">
                <span className="btn-text-main">מאפיית פרידמן</span>
                <span className="btn-text-sub">ספר מתכונים</span>
              </div>
            </Link>

            <div className="coffee-grid">
              {[
                { category: 'fam', img: '/coffee/CoffeeFam/%D7%9E%D7%A4%D7%95%D7%A8%D7%A1%D7%9E%D7%99%D7%9D.jpeg', label: 'מפורסמים בעגלה' },
                { category: 'pic', img: '/coffee/CoffeePIC/%D7%9B%D7%95%D7%A1%20%D7%9E%D7%A2%D7%95%D7%A6%D7%91%D7%AA%20%D7%9E%D7%97%D7%99%D7%99%D7%9B%D7%AA.jpeg', label: 'תמונות עגלה' },
                { category: 'event', img: '/coffee/CoffeeEvent/7f351100-6fed-40e2-89ec-ec2314840e5a.jpg', label: 'אירועי מאפיית פרידמן' },
              ].map(({ category, img, label }) => (
                <a
                  key={category}
                  href="#"
                  className="coffee-card"
                  onClick={(e) => { e.preventDefault(); openGallery(category); }}
                >
                  <div className="coffee-card-img-wrapper">
                    <Image
                      src={img}
                      alt={label}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="coffee-card-img"
                    />
                  </div>
                  <div className="coffee-card-label"><span>{label}</span></div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
      <GalleryModal
        isOpen={activeCategory !== null}
        images={images}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNext={handleNext}
        onPrev={handlePrev}
        zoomable
      />
    </section>
  );
}
