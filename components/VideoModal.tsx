'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
}

export default function VideoModal({ isOpen, videoUrl, onClose }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Convert watch URL to embed URL
  const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;

  return (
    <div 
      className="gallery-modal active video-modal-overlay" 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="video-modal-content">
        <button className="close-modal video-close-btn" onClick={onClose}>
          <X size={28} />
        </button>
        <div className="video-responsive-container">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
