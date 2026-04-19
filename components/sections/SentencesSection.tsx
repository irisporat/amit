import Image from 'next/image';
import './SentencesSection.css';

export default function SentencesSection() {
  return (
    <section id="sentences" className="sentences-section">
      <div className="section-page-header">
        <h2>לדברי עמית</h2>
      </div>
      <div className="sentences-wrapper">
        <div className="sentences-grid">
          {/* Right Side Image */}
          <div className="sentence-img-container right-img">
            <Image
              src="/Sentences/Amit Sentences.jpeg"
              alt="לדברי עמית - 1"
              width={800}
              height={1000}
              className="sentence-img"
              style={{ objectFit: 'contain' }}
            />
          </div>
          {/* Left Side Image */}
          <div className="sentence-img-container left-img">
            <Image
              src="/Sentences/napkin.jpeg"
              alt="לדברי עמית - 2"
              width={800}
              height={1000}
              className="sentence-img"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
