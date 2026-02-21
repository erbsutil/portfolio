import { useState, useEffect, useCallback } from 'react';

export interface CarouselItem {
  type: 'project' | 'talk';
  href?: string;
  label: string;
  title: string;
  summary: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
  interval?: number;
}

/**
 * HeroCarousel - A performance-focused React island for Astro.
 * 
 * Refined to prevent layout shifts by using a fixed container height.
 * Controls are placed in a fixed position at the bottom to ensure stability.
 */
export default function HeroCarousel({ items = [], interval = 12000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Jump by 2 to avoid item overlap, ensuring alignment with discrete pages
  const next = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActive((prev) => {
        const nextIdx = prev + 2;
        return nextIdx >= items.length ? 0 : nextIdx;
      });
      setIsFading(false);
    }, 300);
  }, [items.length, isFading]);

  const prev = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActive((prev) => {
        const nextIdx = prev - 2;
        if (nextIdx < 0) {
          // Jump to the start of the last possible page
          return (Math.ceil(items.length / 2) - 1) * 2;
        }
        return nextIdx;
      });
      setIsFading(false);
    }, 300);
  }, [items.length, isFading]);

  useEffect(() => {
    if (!items || items.length <= 2 || isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [items.length, interval, next, isPaused]);

  // If items are not provided or empty, render nothing.
  // This check is crucial before accessing items[active].
  if (!items || items.length === 0) return null;

  const displayItems = [
    items[active],
    items[(active + 1) % items.length]
  ];

  return (
    <div 
      className="hero-carousel-container" 
      role="region" 
      aria-roledescription="carousel" 
      aria-label="Recent work highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="hero-carousel-viewport">
        <div className={`hero-carousel-list ${isFading ? 'fading' : ''}`}>
          {displayItems.map((item, idx) => (
            <a 
              key={`${item.href}-${idx}`}
              href={item.href}
              className="hero-carousel-card"
              tabIndex={0}
              role="button"
            >
              <div className="card-header">
                <span className="card-meta">{item.label}</span>
                <div className="card-badges">
                   <span className="badge">{item.type === 'project' ? 'Case' : 'Talk'}</span>
                </div>
              </div>
              <span className="card-title">{item.title}</span>
              <p className="card-description">{item.summary}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="hero-carousel-nav">
        <button 
          type="button"
          onClick={prev} 
          className="carousel-btn" 
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <div className="carousel-dot-indicator">
          <span className="dot-text">{Math.floor(active / 2) + 1} / {Math.ceil(items.length / 2)}</span>
        </div>

        <button 
          type="button"
          onClick={next} 
          className="carousel-btn" 
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <style>{`
        .hero-carousel-container {
          position: relative;
          padding-bottom: 2.5rem; /* Space for fixed nav */
        }
        
        .hero-carousel-viewport {
          height: 420px; /* Tighter fixed height */
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .hero-carousel-list {
          display: flex;
          flex-direction: column;
          gap: 0.875rem; /* Tighter gap */
          opacity: 1;
          transition: opacity 300ms ease-in-out;
        }
        
        .hero-carousel-list.fading {
          opacity: 0;
        }

        .hero-carousel-card {
          display: block;
          padding: 1.25rem 1.5rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          min-height: 170px; /* Stable min-height */
          height: auto;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }

        .hero-carousel-card:hover {
          border-color: var(--color-text-muted);
          background: var(--color-bg-elevated);
          transform: translateY(-2px);
        }

        .hero-carousel-card:focus-visible {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 1px var(--color-accent);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.625rem;
          gap: 1rem;
        }

        .card-meta {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
        }

        .badge {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          background: var(--color-bg-elevated);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
        }
        
        .card-title {
          display: block;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .card-description {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 0.9375rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        /* Navigation - Anchored Bottom Right */
        .hero-carousel-nav {
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          height: 2rem;
        }

        .carousel-btn {
          background: none;
          border: none;
          padding: 0.5rem; /* Increased hit area */
          margin: -0.5rem; /* Compensate padding for alignment */
          color: var(--color-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .carousel-btn:hover {
          opacity: 1;
          color: var(--color-text-muted); /* Match grounded gray tone */
          transform: scale(1.1);
        }

        .carousel-btn:active {
          transform: scale(0.95);
        }

        .carousel-btn:focus-visible {
          opacity: 1;
          color: var(--color-text-muted);
          outline: 2px solid var(--color-accent);
          outline-offset: 4px;
        }

        .carousel-dot-indicator {
          font-size: 0.875rem; /* 14px for better A11y */
          color: var(--color-text-muted);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.05em;
          min-width: 3rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .hero-carousel-viewport {
            height: 440px; /* Reduced to fix large margin */
          }
          .case-title {
            font-size: 1rem;
          }
          .hero-carousel-nav {
            right: auto;
            left: 50%;
            transform: translateX(-50%);
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  );
}
