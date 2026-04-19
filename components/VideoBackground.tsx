'use client';

export default function VideoBackground() {
  return (
    <div className="video-bg-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="video-bg"
        id="bg-video"
      >
        <source src="/main/clouds480.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
    </div>
  );
}
