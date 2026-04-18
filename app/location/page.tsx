import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Navigation as NavIcon, Map } from 'lucide-react';
import './location.css';

export const metadata: Metadata = {
  title: 'מיקום עגלת הקפה - קפה החברים של עמית',
  description: 'מיקום עגלת קפה החברים של עמית - הדקל 11 פינת ברלב, נווה סביון, אור יהודה',
};

export default function LocationPage() {
  return (
    <>
      <main className="main-content-scroll">
        <div className="back-link-wrapper" style={{ marginTop: '36px' }}>
          <Link href="/coffee" className="back-to-hub">
            <ArrowRight /> חזרה לעגלת הקפה
          </Link>
        </div>
        <div className="location-wrapper" style={{ marginTop: 0 }}>
          <div className="location-body">
            <div className="location-info">
              <div className="info-card">
                <MapPin width={22} height={22} />
                <div className="info-card-body">
                  <strong>כתובת</strong>
                  <p>הדקל 11 פינת ברלב<br />שכונת נווה סביון, אור יהודה</p>
                </div>
              </div>
              <div className="info-card">
                <Clock width={22} height={22} />
                <div className="info-card-body">
                  <strong>שעות פעילות</strong>
                  <p>ימי שישי — 10:00–13:00</p>
                </div>
              </div>
              <div className="info-card">
                <NavIcon width={22} height={22} />
                <div className="info-card-body">
                  <strong>ניווט</strong>
                  <p>קפה החברים של עמית</p>
                  <a
                    href="https://waze.com/ul?q=קפה%20החברים%20של%20עמית&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waze-btn"
                  >
                    <Map width={16} height={16} />
                    נווט עם Waze
                  </a>
                </div>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://maps.google.com/maps?q=%D7%A7%D7%A4%D7%94+%D7%94%D7%97%D7%91%D7%A8%D7%99%D7%9D+%D7%A9%D7%9C+%D7%A2%D7%9E%D7%99%D7%AA,+%D7%90%D7%95%D7%A8+%D7%99%D7%94%D7%95%D7%93%D7%94&t=&z=17&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
