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
            לינק להורדת הגופן
          </a>
        </div>
      </div>
    </section>
  );
}
