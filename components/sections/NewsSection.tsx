'use client';

import { useState } from 'react';
import Image from 'next/image';
import './NewsSection.css';

const NEWS_IMG_FALLBACK = '/news/coffe 1.jpeg';

const newsArticles = [
  {
    title: 'לזכרו של סמ"ר עמית פרידמן',
    source: 'Ynet',
    image: '/news/גלצ.jpeg',
    link: 'https://www.ynet.co.il/gal-hed/article/b1jpe83pbl?utm_source=ynet.app.ios&utm_term=b1jpe83pbl&utm_campaign=whatsapp&utm_medium=social?utm_source=https://www.ynet.co.il&utm_medium=social&utm_campaign=general_share',
  },
  {
    title: 'קפה לזכרו של גיבור',
    source: 'עיתונות מקומית',
    image: '/news/coffe 1.jpeg',
    link: '/news/coffe 1.jpeg',
  },
  {
    title: 'השקת עגלת הקפה',
    source: 'עיתונות מקומית',
    image: '/news/coffe 2.jpeg',
    link: '/news/coffe 2.jpeg',
  },
];

function NewsCard({ title, source, image, link }: { title: string; source: string; image: string; link: string }) {
  const [src, setSrc] = useState(image);
  return (
    <a className="news-section-card" href={link} target="_blank" rel="noopener noreferrer">
      <div className="news-section-img-wrap">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="card-img"
          onError={() => setSrc(NEWS_IMG_FALLBACK)}
        />
      </div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{source}</p>
      </div>
    </a>
  );
}

export default function NewsSection() {
  return (
    <section id="news" className="news-section">
      <div className="section-page-header">
        <h2>כתבות בעיתונות</h2>
      </div>
      <div className="news-section-wrapper">
        <div className="news-section-grid">
          {newsArticles.map((article, i) => (
            <NewsCard key={i} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
