'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  zoomable?: boolean;
}

function getImageTitle(src: string): string {
  if (!src) return '';
  try {
    const decoded = decodeURIComponent(src);
    const filenameWithExt = decoded.substring(decoded.lastIndexOf('/') + 1);
    const extIndex = filenameWithExt.lastIndexOf('.');
    const filename = extIndex !== -1 ? filenameWithExt.substring(0, extIndex) : filenameWithExt;

    // Check only the 5 new sport images:
    if (filename === 'Basketball 11.6.26-1') {
      return 'משחק כדורסל 11.6.26';
    }
    if (
      filename === 'Football 11.6.26 -1' ||
      filename === 'Football 11.6.26 -2' ||
      filename === 'Football 11.6.26 -3'
    ) {
      return 'משחק כדורגל 11.6.26';
    }
    if (filename === 'macabia' || filename === 'macabia -2') {
      return 'מכביה 2026';
    }
    
    return '';
  } catch (e) {
    return '';
  }
}

const captionStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  color: '#ffffff',
  padding: '8px 24px',
  textAlign: 'center',
  fontSize: '1.1rem',
  fontWeight: '500',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-main), Rubik, sans-serif',
  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
  pointerEvents: 'none',
  zIndex: 10,
  maxWidth: '90%',
};

export default function GalleryModal({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  zoomable = false,
}: GalleryModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onPrev();
      if (e.key === 'ArrowLeft') onNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.classList.remove('zoomed');
    }
  }, [currentIndex]);

  const syncZoomable = useCallback(() => {
    if (!imgRef.current) return;
    if (!zoomable || !modalRef.current) {
      imgRef.current.dataset.zoomable = 'false';
      return;
    }
    const modalContent = modalRef.current.querySelector('.modal-content') as HTMLElement;
    const img = imgRef.current;
    const isSmall =
      img.naturalWidth < modalContent.clientWidth * 0.85 ||
      img.naturalHeight < modalContent.clientHeight * 0.85;
    img.dataset.zoomable = isSmall ? 'true' : 'false';
  }, [zoomable]);

  const handleImgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!zoomable || !imgRef.current || !modalRef.current) return;
    const modalContent = modalRef.current.querySelector('.modal-content') as HTMLElement;
    const img = imgRef.current;
    const isSmall =
      img.naturalWidth < modalContent.clientWidth * 0.85 ||
      img.naturalHeight < modalContent.clientHeight * 0.85;
    if (isSmall) {
      img.classList.toggle('zoomed');
    }
  };

  const showNav = images.length > 1;
  const caption = getImageTitle(images[currentIndex]);

  if (!isOpen) return null;

  return (
    <div
      id="gallery-modal"
      className="gallery-modal active"
      ref={modalRef}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <X />
        </button>
        {showNav && (
          <button className="nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
            <ChevronRight />
          </button>
        )}
        <div className="image-container" style={{ position: 'relative' }}>
          <Image
            ref={imgRef}
            id="gallery-img"
            src={images[currentIndex]}
            alt="Gallery Image"
            width={2400}
            height={1600}
            unoptimized
            sizes="90vw"
            onClick={handleImgClick}
            onLoad={syncZoomable}
          />
          {caption && (
            <div className="gallery-image-caption" style={captionStyle}>
              {caption}
            </div>
          )}
        </div>
        {showNav && (
          <button className="nav-btn next-btn" onClick={(e) => { e.stopPropagation(); onNext(); }}>
            <ChevronLeft />
          </button>
        )}
      </div>
      <div className="gallery-counter" dir="ltr">
        <span id="current-index">{currentIndex + 1}</span> / <span id="total-count">{images.length}</span>
      </div>
    </div>
  );
}
