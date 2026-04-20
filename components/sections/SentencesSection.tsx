import Image from 'next/image';
import './SentencesSection.css';

export default function SentencesSection() {
  return (
    <section id="sentences" className="sentences-section">
      <div className="sentences-bg-layer">
        <Image
          src="/Sentences/PicAmit.jpg"
          alt="עמית פרידמן"
          fill
          sizes="100vw"
          className="sentences-bg-img"
          priority
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
      
      <div className="sentences-left-content">
        <div className="handwriting-wrapper">
          <Image
            src="/Sentences/handwriting.png"
            alt="כתב יד של עמית"
            fill
            sizes="66vw"
            className="handwriting-img"
          />
        </div>

        <div className="font-download-wrapper">
          <a 
            href="https://www.ot-hayim.co.il/fonts/amit-friedman/" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-download-link"
          >
            קישור להורדת הגופן
          </a>
        </div>

        <div className="sentences-social-links mobile-only">
          <a
            href="https://www.instagram.com/remember_amitfriedman/"
            target="_blank"
            rel="noopener noreferrer"
            className="sentences-social-icon"
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
            className="sentences-social-icon"
          >
            <Image
              src="/main/tiktok.svg"
              alt="TikTok"
              width={45}
              height={45}
              className="sentences-tiktok-logo"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
