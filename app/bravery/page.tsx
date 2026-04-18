import type { Metadata } from 'next';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BodyClass from '@/components/BodyClass';
import './bravery.css';

export const metadata: Metadata = {
  title: 'סיפור גבורתו - עמית פרידמן',
};

export default function BraveryPage() {
  return (
    <>
      <BodyClass className="bravery-page" />
      <div id="navigation-root">
        <Navigation pageTitle="סיפור גבורתו" />
      </div>
      <main className="main-content-scroll">
        <div className="bravery-container">
          <div className="bravery-image-col">
            <Image
              src="/Bravery/Wings.PNG"
              alt="עמית פרידמן - כנפיים"
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 48vw"
              priority
              className="bravery-img"
            />
            <a href="https://www.youtube.com/watch?v=gAIJvP0JXAo" target="_blank" rel="noopener noreferrer" className="bravery-video-btn desktop-only">
              <PlayCircle />
              <div className="btn-text-content">
                <span className="btn-text-main">מצפן מורשת - חטיבת הנח״ל</span>
              </div>
            </a>
          </div>
          <div className="bravery-text-col">
            <h1 className="bravery-title">סיפור גבורתו</h1>
            <h3 className="bravery-subtitle">סמל ראשון עמית פרידמן מ&quot;כ בגדוד 932 של חטיבת הנח&quot;ל, נפל בקרב בתל סולטן שברפיח, רצועת עזה.</h3>
            <div className="bravery-story">
              <p>בשבת כ&quot;ב בתשרי, שמחת תורה תשפ&quot;ד, 7 באוקטובר 2023, בשעה שש וחצי בבוקר, פתח ארגון הטרור חמאס מרצועת עזה במתקפת פתע על ישראל. בבוקר זה החלה מלחמה.</p>
              <p>כשהחלה המלחמה עמית היה בעיצומה של ההכשרה, סיים אותה בהצטיינות, ויצא מיד לאחר מכן לקורס מ״כים.</p>
              <p>ביולי 2024 שב לגדוד כמפקד כיתה בפלוגה המבצעית. חייליו נקשרו אליו מיד וראו בו דמות נערצת וכריזמטית. יחד עמו נכנסו לקרבות ברצועת עזה.</p>
              <p>ביום שלישי 27 באוגוסט 2024 יצא עם הכוח לפשיטה מבצעית בשכונת תל סולטן ברפיח. עמית זיהה חוליית מחבלים, הזהיר את חבריו, פתח באש וחתר למגע. בקרב שהתפתח לחם בגבורה עד שנפל.</p>
              <p>סמל עמית פרידמן נפל בקרב ביום כ&quot;ד באב תשפ&quot;ד (27.8.2024). בן תשע-עשרה בנופלו. הובא למנוחות בחלקה הצבאית של בית העלמין ביהוד.</p>
              <p className="bravery-footer">לאחר נפילתו הועלה לדרגת סמל ראשון. יהי זכרו ברוך.</p>
            </div>
            <a href="https://www.youtube.com/watch?v=gAIJvP0JXAo" target="_blank" rel="noopener noreferrer" className="bravery-video-btn mobile-only">
              <PlayCircle />
              <div className="btn-text-content">
                <span className="btn-text-main">מצפן מורשת - חטיבת הנח״ל</span>
              </div>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
