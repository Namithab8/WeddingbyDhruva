import React, { useRef, useEffect, useState, useCallback } from 'react';
import StreetHero from '../components/StreetHero.jsx';
import WeddingCompany from '../components/WeddingCompany.jsx';
import WhyChooseDhruva from '../components/WhyChooseDhruva.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import TitleSection from '../components/TitleSection.jsx';

const UNROLL_END = 0.72;
const ROLL_DURATION = 26000;
const PAUSE_DURATION = 2600;
const SPEED = 1 / ROLL_DURATION;

export default function Home() {
  const wrapRef = useRef(null);
  const panelRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const progressRef = useRef(0);
  const pausedUntilRef = useRef(0);
  const doneRef = useRef(false);

  const applyProgress = useCallback((p) => {
    progressRef.current = p;
    setProgress(p);
  }, []);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.style.transform = panelOpen ? 'translateY(0%)' : 'translateY(100%)';
    }
  }, [panelOpen]);

  const pause = useCallback((ms = PAUSE_DURATION) => {
    pausedUntilRef.current = performance.now() + ms;
  }, []);

  const resume = useCallback(() => {
    pausedUntilRef.current = 0;
  }, []);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (!doneRef.current && now >= pausedUntilRef.current) {
        const p = Math.min(1, progressRef.current + dt * SPEED);
        applyProgress(p);
        if (p >= 1) doneRef.current = true;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [applyProgress]);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  const unroll = isMobile ? 1 : Math.min(1, progress / UNROLL_END);

  return (
    <>
      <section className="scroll-wrap" ref={wrapRef}>
        <div className="scroll-stage">
          <div className="stage-street">
            <StreetHero unroll={unroll} onPause={pause} onResume={resume} onShowPanel={() => setPanelOpen(true)} />
            <TitleSection />
          </div>
          <div className="stage-panel" ref={panelRef}>
            <WeddingCompany />
          </div>
        </div>
      </section>
      <WhyChooseDhruva />
      <HowItWorks />
    </>
  );
}
