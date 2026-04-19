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
            <div className="left-img-wrapper">
              <Image
                src="/Sentences/napkin.jpeg"
                alt="לדברי עמית - 2"
                width={800}
                height={1000}
                className="sentence-img"
                style={{ objectFit: 'contain' }}
              />
              <div className="sentence-social-links">
                <a
                  href="https://www.instagram.com/remember_amitfriedman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sentence-social-icon"
                >
                  <Image
                    src="/Sentences/instagram-logo-png-7.png"
                    alt="Instagram"
                    width={45}
                    height={45}
                  />
                </a>
                <a
                  href="https://www.tiktok.com/search?q=%D7%9C%D7%96%D7%9B%D7%A8%20%D7%A1%D7%9E%22%D7%A8%20%D7%A2%D7%9E%D7%99%D7%AA%20%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F%20-%20%D7%94%D7%A8%D7%A9%D7%9E%D7%99&t=1776615784329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sentence-social-icon"
                >
                  <Image
                    src="/Sentences/TikTok-Logo.jpg"
                    alt="TikTok"
                    width={90}
                    height={45}
                    className="tiktok-logo-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
