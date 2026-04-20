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
            <h1 className="memorial-name">
              <span className="memorial-rank">סמ&quot;ר</span>
              {' '}
              עמית פרידמן
              <span className="memorial-suffix">ז&quot;ל</span>
            </h1>
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

          <div className="hero-social-links hide-on-mobile">
            <a
              href="https://www.instagram.com/remember_amitfriedman/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
            >
              <Image
                src="/main/instegram.svg"
                alt="Instagram"
                width={45}
                height={45}
              />
            </a>
            <a
              href="https://www.tiktok.com/search?q=%D7%9C%D7%96%D7%9B%D7%A8%20%D7%A1%D7%9E%22%D7%A8%20%D7%A2%D7%9E%D7%99%D7%AA%20%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F%20-%20%D7%94%D7%A8%D7%A9%D7%9E%D7%99&t=1776615784329"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon"
            >
              <Image
                src="/main/tiktok.svg"
                alt="TikTok"
                width={45}
                height={45}
                className="hero-tiktok-logo"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
