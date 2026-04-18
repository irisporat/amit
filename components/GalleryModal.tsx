'use client';

import { useEffect, useRef, useCallback } from 'react';
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
        <div className="image-container">
          <img
            ref={imgRef}
            id="gallery-img"
            src={images[currentIndex]}
            alt="Gallery Image"
            onClick={handleImgClick}
            onLoad={syncZoomable}
          />
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
