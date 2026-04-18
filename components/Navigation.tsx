'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu, X, Home, Info, Shield, Coffee,
  Calendar, Heart, Newspaper, Mail,
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

interface NavigationProps {
  pageTitle: string;
  hideHamburger?: boolean;
}

export default function Navigation({ pageTitle, hideHamburger = false }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-right">
          {!hideHamburger && (
            <button className="hamburger-btn-top" onClick={toggleMenu}>
              <Menu strokeWidth={2.5} width={28} height={28} />
            </button>
          )}
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        <div className="top-bar-left">
          <Link href="/">
            <img src="/images/main/לוגו עגלה לבן.png" alt="לוגו עגלה" />
          </Link>
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
          <Link href="/" onClick={toggleMenu}><Home /> דף הבית</Link>
          <Link href="/about" onClick={toggleMenu}><Info /> סיפורו של עמית</Link>
          <Link href="/bravery" onClick={toggleMenu}><Shield /> סיפור גבורתו</Link>
          <Link href="/coffee" onClick={toggleMenu}><Coffee /> עגלת &quot;קפה החברים של עמית&quot;</Link>
          <Link href="/events" onClick={toggleMenu}><Calendar /> אירועי הנצחה</Link>
          <Link href="/remember" onClick={toggleMenu}><Heart /> זוכרים אותך</Link>
          <Link href="/news" onClick={toggleMenu}><Newspaper /> כתבות בעיתונות</Link>
          <Link href="/contact" onClick={toggleMenu}><Mail /> צור קשר</Link>
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
