'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import GalleryModal from '@/components/GalleryModal';
import BodyClass from '@/components/BodyClass';
import CoffeeHeroVideo from '@/components/CoffeeHeroVideo';
import './coffee.css';

const galleryData: Record<string, string[]> = {
  fam: [
    '/coffee/CoffeeFam/מפורסמים.jpeg',
    '/coffee/CoffeeFam/DSC_1403.jpg',
    '/coffee/CoffeeFam/ליאת פרידמן ושחר חיון, בפסל הלב לזכרו של עמית פרידמן.jpeg',
    '/coffee/CoffeeFam/מה קשור בעגלה.jpeg',
    '/coffee/CoffeeFam/עגלה עם ליאת שוחט.jpeg',
  ],
  pic: [
    '/coffee/CoffeePIC/כוס מעוצבת מחייכת.jpeg',
    '/coffee/CoffeePIC/CoffeePic1.jpeg',
    '/coffee/CoffeePIC/DSC_5887.jpg',
    '/coffee/CoffeePIC/IMG_9418.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 15.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 29.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 50.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 51.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 60.jpeg',
    '/coffee/CoffeePIC/Rmember Amit 62.jpeg',
    '/coffee/CoffeePIC/WhatsApp Image 2026-04-13 at 19.38.33.jpeg',
    '/coffee/CoffeePIC/wine.jpeg',
    '/coffee/CoffeePIC/לב בכיכר.jpeg',
    '/coffee/CoffeePIC/מפית משפטים.jpeg',
    '/coffee/CoffeePIC/קפה החברים של עמית צילום יחצ (1).jpg',
    '/coffee/CoffeePIC/קפה החברים של עמית צילום נטלי בוגנה.jpg',
  ],
  event: [
    '/coffee/CoffeeEvent/IMG_7735.JPEG',
    '/coffee/CoffeeEvent/7f351100-6fed-40e2-89ec-ec2314840e5a.jpg',
    '/coffee/CoffeeEvent/IMG_8861.JPEG',
    '/coffee/CoffeeEvent/WhatsApp Image 2026-04-13 at 19.38.34.jpeg',
  ],
};

export default function CoffeePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => { setActiveCategory(category); setCurrentIndex(0); };
  const closeGallery = useCallback(() => setActiveCategory(null), []);
  const images = activeCategory ? (galleryData[activeCategory] ?? []) : [];
  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <>
      <BodyClass className="coffee-main-page" />
      <main className="main-content-scroll">
        <div className="coffee-main-container">
          <section className="coffee-hero">
            <div className="coffee-image-col">
              <div className="coffee-logo-area">
                <Image
                  src="/main/לוגו עגלה לבן.png"
                  alt="לוגו קפה החברים של עמית"
                  width={160}
                  height={160}
                  sizes="160px"
                  className="coffee-logo-img"
                  priority
                />
              </div>
              <Image
                src="/coffee/CoffeePIC/CoffeePic1.jpeg"
                alt="עגלת הקפה של עמית"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="coffee-hero-img"
                priority
              />
              <CoffeeHeroVideo />
            </div>
            <div className="coffee-info-col">
              <h1 className="coffee-main-title">עגלת &quot;קפה החברים של עמית&quot;</h1>
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
                </p>
              </div>

              <Link href="/coffee/recipe" className="coffee-recipe-btn unified-btn">
                <BookOpen />
                <div className="btn-text-content">
                  <span className="btn-text-main">מאפיית פרידמן</span>
                  <span className="btn-text-sub">ספר מתכונים</span>
                </div>
              </Link>

              <section className="coffee-grid">
                {[
                  { category: 'fam', img: '/coffee/CoffeeFam/מפורסמים.jpeg', label: 'מפורסמים בעגלה' },
                  { category: 'pic', img: '/coffee/CoffeePIC/כוס מעוצבת מחייכת.jpeg', label: 'תמונות עגלה' },
                  { category: 'event', img: '/coffee/CoffeeEvent/IMG_7735.JPEG', label: 'אירועי מאפיית פרידמן' },
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
              </section>
            </div>
          </section>
        </div>
      </main>
      <GalleryModal
        isOpen={activeCategory !== null}
        images={images}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNext={handleNext}
        onPrev={handlePrev}
        zoomable
      />
    </>
  );
}
