'use client';

import Navigation from '@/components/Navigation';

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
    image: '/images/news/coffe 1.jpeg',
    link: '/images/news/coffe 1.jpeg',
  },
  {
    title: 'השקת עגלת הקפה',
    source: 'עיתונות מקומית',
    image: '/images/news/coffe 2.jpeg',
    link: '/images/news/coffe 2.jpeg',
  },
];

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
                <a
                  key={i}
                  className="news-card"
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="card-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1585829365234-78d9b692d47d?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <div className="card-info">
                    <h3>{article.title}</h3>
                    <p>{article.source}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
