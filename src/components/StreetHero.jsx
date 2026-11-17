import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { goldifyCanvas } from '../utils/goldRecolor.js';

const HOTSPOTS = [
  { label: 'ABOUT ME', to: '/', scrollTo: 'about-us', left: '3%', top: '30%', width: '20%', height: '45%' },
  { label: 'OUR TEAM', to: '/team', left: '22%', top: '30%', width: '18%', height: '45%' },
  { label: 'MEDIA', to: '/media', left: '39%', top: '30%', width: '18%', height: '45%' },
  { label: 'GALLERY', to: '/gallery', left: '57%', top: '25%', width: '15%', height: '45%' },
  { label: 'OUR SERVICES', to: '/services', left: '72%', top: '20%', width: '14%', height: '60%' },
  { label: 'CONTACT US', to: '/contact', left: '86%', top: '30%', width: '12%', height: '40%', tip: 'end' },
];

function StreetCopy({ unroll = 1, onPause, onResume, onShowPanel }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(-1);
  const [processed, setProcessed] = useState(null);
  const imgRef = useRef(null);

  const clip = Math.min(1, Math.max(0, unroll));

  const go = (h) => {
    if (h.scrollTo) {
      onShowPanel?.();
    } else {
      navigate(h.to);
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const process = () => {
      const canvas = goldifyCanvas(img);
      setProcessed(canvas.toDataURL('image/png'));
    };

    if (img.complete && img.naturalWidth) process();
    else img.addEventListener('load', process, { once: true });
  }, []);

  const regionStyle = (h) => {
    const w = parseFloat(h.width);
    const ht = parseFloat(h.height);
    const l = parseFloat(h.left);
    const t = parseFloat(h.top);
    return {
      width: `${(100 / w) * 100}%`,
      height: `${(100 / ht) * 100}%`,
      left: `${(-l / w) * 100}%`,
      top: `${(-t / ht) * 100}%`,
    };
  };

  return (
    <div className="street-copy">
      <div
        className="unroll-clip"
        style={{ clipPath: `inset(0 ${100 - clip * 100}% 0 0)` }}
      >
        <img
          ref={imgRef}
          src="/dhruva-street.png"
          alt="Dhruva wedding street illustration"
          draggable="false"
        />
        {HOTSPOTS.map((h, i) => (
          <button
            key={h.label + i}
            type="button"
            className={`hotspot ${hovered === i ? 'hotspot-hover' : ''}`}
            style={{ left: h.left, top: h.top, width: h.width, height: h.height }}
            onMouseEnter={() => { setHovered(i); onPause?.(60000); }}
            onMouseLeave={() => { setHovered(-1); onResume?.(); }}
            onFocus={() => { setHovered(i); onPause?.(60000); }}
            onBlur={() => { setHovered(-1); onResume?.(); }}
            onClick={() => { onPause?.(); go(h); }}
            aria-label={h.label}
          >
            {processed && (
              <span className="hotspot-region" aria-hidden="true">
                <img src={processed} alt="" style={regionStyle(h)} draggable="false" />
              </span>
            )}
            <span className="hotspot-num">{i + 1}</span>
            <span className={`hotspot-tip ${h.tip || ''} ${hovered === i ? 'show' : ''}`}>{h.label}</span>
          </button>
        ))}
      </div>
      <div
        className={`scroll-roll ${clip >= 1 ? 'roll-done' : ''}`}
        style={{ left: `calc(${clip * 100}% - 8px)`, '--roll-scale': (1 - clip * 0.35).toFixed(3) }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function StreetHero({ unroll = 1, onPause, onResume, onShowPanel }) {
  return (
    <section className="home">
      <div className="street-viewport">
        <div className="street-track">
          <StreetCopy unroll={unroll} onPause={onPause} onResume={onResume} onShowPanel={onShowPanel} />
        </div>
      </div>
    </section>
  );
}
