'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function CoffeeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(err => console.log('Autoplay blocked:', err));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Play when at least 50% visible
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  return (
    <div className="embedded-video-wrapper">
      <video
        ref={videoRef}
        id="hero-video"
        loop
        muted
        playsInline
        className="coffee-embedded-video"
      >
        <source src="/coffee/VIDEO-2025-07-23-12-35-10.mp4" type="video/mp4" />
      </video>
      <button type="button" id="unmute-btn" className="video-unmute-btn" onClick={toggleMute}>
        {muted ? <VolumeX /> : <Volume2 />}
        <span>{muted ? 'הפעל סאונד' : 'השתק'}</span>
      </button>
    </div>
  );
}
