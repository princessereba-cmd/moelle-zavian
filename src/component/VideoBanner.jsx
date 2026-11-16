import { useEffect, useRef } from "react";

// Full-width muted video that only plays (and downloads) while it is on screen.
// This keeps the page light: off-screen videos don't use bandwidth or CPU.
function VideoBanner({ src, poster, label }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="video-banner" aria-label={label}>
      <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="none" />
    </section>
  );
}

export default VideoBanner;
