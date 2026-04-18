'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Home, Info, Shield, Coffee,
  Calendar, Heart, Newspaper, Mail,
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

interface NavigationProps {
  pageTitle?: string;
  hideHamburger?: boolean;
}

const sectionLinks = [
  { id: 'home', icon: <Home />, label: 'דף הבית' },
  { id: 'about', icon: <Info />, label: 'סיפורו של עמית' },
  { id: 'bravery', icon: <Shield />, label: 'סיפור גבורתו' },
  { id: 'events', icon: <Calendar />, label: 'אירועי הנצחה' },
  { id: 'remember', icon: <Heart />, label: 'זוכרים אותך' },
  { id: 'news', icon: <Newspaper />, label: 'כתבות בעיתונות' },
  { id: 'contact', icon: <Mail />, label: 'צור קשר' },
];

export default function Navigation({ pageTitle = '', hideHamburger = false }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleSectionNav = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (pathname === '/') {
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
              src="/main/לוגו עגלה לבן.png"
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
          {sectionLinks.map(({ id, icon, label }) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={(e) => handleSectionNav(e, id)}
            >
              {icon} {label}
            </a>
          ))}
          <Link href="/coffee" onClick={toggleMenu}>
            <Coffee /> עגלת &quot;קפה החברים של עמית&quot;
          </Link>
        </nav>
        <div className="menu-social">
          <a
            href="https://www.instagram.com/remember_amitfriedman/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram size={30} />
          </a>
          <div className="social-icon facebook">
            <FaFacebook size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
