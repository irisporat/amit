import Image from 'next/image';
import VideoBackground from '@/components/VideoBackground';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <VideoBackground />

      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <filter id="remove-white">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1 -1 -1 3 0"
          />
        </filter>
      </svg>

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hello-world-container">
        <div className="memorial-image-container">
          <Image
            src="/main/amit mag home11.png"
            alt="עמית פרידמן"
            width={1200}
            height={1600}
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className="memorial-image"
          />
        </div>
        <div className="memorial-text-container">
          <div className="memorial-headline">
            <div className="memorial-rank">סמ&quot;ר</div>
            <div className="memorial-name-wrapper">
              <h1 className="memorial-name">
                עמית פרידמן
                <span className="memorial-suffix">ז&quot;ל</span>
              </h1>
            </div>
            <div className="memorial-dates" dir="ltr">2005 – 2024</div>
          </div>
          <div className="memorial-info">
            לוחם בחטיבת הנח&quot;ל, נפל בקרב ברפיח<br />
            ביום כ&quot;ד באב תשפ&quot;ד (27.8.2024)
          </div>
          <div className="memorial-quote">
            &quot;מעצבן אותי אנשים שמפסידים חוויות<br />בגלל שלא היה להם כח לקום&quot;
          </div>
          <div className="memorial-motto">
            מלח הארץ שהיה גם מלך החיים הטובים
          </div>
        </div>
      </div>
    </section>
  );
}
