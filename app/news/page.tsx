'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

const NEWS_IMG_FALLBACK =
  'https://images.unsplash.com/photo-1585829365234-78d9b692d47d?auto=format&fit=crop&w=300&q=80';

const newsArticles = [
  {
    title: 'לזכרו של סמ"ר עמית פרידמן',
    source: 'Ynet',
    image: 'https://v.ynet.co.il/PicServer5/2023/10/08/12948639/12948633010099640360no.jpg',
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

function NewsArticleCard({
  title,
  source,
  image,
  link,
}: {
  title: string;
  source: string;
  image: string;
  link: string;
}) {
  const [src, setSrc] = useState(image);

  return (
    <a
      className="news-card"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-img-fill-wrap">
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

export default function NewsPage() {
  return (
    <>
      <div id="navigation-root">
        <Navigation pageTitle="כתבות בעיתונות" />
      </div>
      <main className="main-content-scroll">
        <div id="app-container">
          <div id="news-view" className="view active">
            <div className="news-grid" id="news-list-container">
              {newsArticles.map((article, i) => (
                <NewsArticleCard
                  key={i}
                  title={article.title}
                  source={article.source}
                  image={article.image}
                  link={article.link}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
