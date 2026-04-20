'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Home, Info, Shield, Coffee,
  Calendar, Heart, Newspaper, Mail, Quote, BookOpen
} from 'lucide-react';

interface NavigationProps {
  pageTitle?: string;
  hideHamburger?: boolean;
}

const sectionLinks = [
  { id: 'home', icon: <Home />, label: 'דף הבית' },
  { id: 'about', icon: <Info />, label: 'סיפורו של עמית' },
  { id: 'bravery', icon: <Shield />, label: 'סיפור גבורתו' },
  { id: 'coffee', icon: <Coffee />, label: 'עגלת "קפה החברים של עמית"' },
  { id: 'recipe', icon: <BookOpen />, label: 'מאפיית פרידמן - ספר מתכונים', path: '/coffee/recipe' },
  { id: 'events', icon: <Calendar />, label: 'אירועי הנצחה' },
  { id: 'remember', icon: <Heart />, label: 'זוכרים אותך עמית' },
  // { id: 'news', icon: <Newspaper />, label: 'כתבות בעיתונות' },
  // { id: 'contact', icon: <Mail />, label: 'צור קשר' },
  { id: 'sentences', icon: <Quote />, label: 'לדברי עמית' },
];

export default function Navigation({ pageTitle = '', hideHamburger = false }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleSectionNav = (e: React.MouseEvent, sectionId: string, path?: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (path) {
      window.location.href = path;
    } else if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-right">
          {!hideHamburger && (
            <button className="hamburger-btn-top" onClick={toggleMenu}>
              <Menu strokeWidth={2.5} width={28} height={28} />
            </button>
          )}
          {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
        </div>
        <div className="top-bar-left">
          <a href="/#home" onClick={(e) => handleSectionNav(e, 'home')}>
            <Image
              src="/main/%D7%9C%D7%95%D7%92%D7%95%20%D7%A2%D7%92%D7%9C%D7%94%20%D7%9C%D7%91%D7%9F.png"
              alt="לוגו עגלה"
              width={200}
              height={50}
              sizes="200px"
              className="nav-logo-img"
            />
          </a>
        </div>
      </header>

      {menuOpen && (
        <div className="side-menu-overlay active" onClick={toggleMenu} />
      )}

      <div className={`side-menu${menuOpen ? ' active' : ''}`}>
        <button className="close-menu-btn" onClick={toggleMenu}>
          <X />
        </button>
        <nav className="menu-nav">
          {sectionLinks.map(({ id, icon, label, path }) => (
            <a
              key={id}
              href={path || `/#${id}`}
              onClick={(e) => handleSectionNav(e, id, path)}
            >
              {icon} {label}
            </a>
          ))}
        </nav>
        <div className="menu-social">
          <a
            href="https://www.instagram.com/remember_amitfriedman/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <Image src="/main/instegram.svg" alt="Instagram" width={30} height={30} />
          </a>
          <a
            href="https://www.tiktok.com/search?q=%D7%9C%D7%96%D7%9B%D7%A8%20%D7%A1%D7%9E%22%D7%A8%20%D7%A2%D7%9E%D7%99%D7%AA%20%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F%20-%20%D7%94%D7%A8%D7%A9%D7%9E%D7%99&t=1776615784329"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon tiktok"
          >
            <Image src="/main/tiktok.svg" alt="TikTok" width={30} height={30} />
          </a>
        </div>
      </div>
    </>
  );
}
