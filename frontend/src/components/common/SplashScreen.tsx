import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'visible' | 'fading'>('visible');

  useEffect(() => {
    // Show splash for 2 seconds, then fade out over 0.5s, then unmount
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 2000);

    const doneTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#070B14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: 'none',
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(ellipse at center, rgba(38,136,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Logo icon */}
      <div
        style={{
          animation: 'splashLogoIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards',
          opacity: 0,
        }}
      >
        <img
          src="/COOLIFT_Design_Assets/02_logo_icon.png"
          alt="COOLIFT"
          style={{
            width: '96px',
            height: '96px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 24px rgba(38,136,255,0.5))',
          }}
        />
      </div>

      {/* Primary wordmark */}
      <div
        style={{
          marginTop: '20px',
          animation: 'splashTextIn 0.6s ease-out 0.4s forwards',
          opacity: 0,
        }}
      >
        <img
          src="/COOLIFT_Design_Assets/01_logo_primary.svg"
          alt="COOLIFT — Lift. Track. Evolve."
          style={{ height: '32px', objectFit: 'contain' }}
          onError={(e) => {
            // Fallback text logo if SVG fails
            const el = e.target as HTMLImageElement;
            el.style.display = 'none';
          }}
        />
        {/* Fallback wordmark rendered in CSS */}
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: '28px',
            letterSpacing: '-0.5px',
            color: '#F8FAFC',
            textAlign: 'center',
          }}
        >
          COO<span style={{ color: '#2688FF' }}>LIFT</span>
        </div>
      </div>

      {/* Tagline */}
      <p
        style={{
          marginTop: '8px',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: '12px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#94A3B8',
          animation: 'splashTextIn 0.6s ease-out 0.7s forwards',
          opacity: 0,
        }}
      >
        Lift. Track. Evolve.
      </p>

      {/* Animated loading bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 48px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '3px',
          backgroundColor: 'rgba(38,136,255,0.15)',
          borderRadius: '99px',
          overflow: 'hidden',
          animation: 'splashTextIn 0.5s ease-out 0.9s forwards',
          opacity: 0,
        }}
      >
        <div
          style={{
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, #2688FF, #06B6D4)',
            borderRadius: '99px',
            animation: 'splashProgress 1.8s ease-out 0.9s forwards',
            boxShadow: '0 0 8px rgba(38,136,255,0.6)',
          }}
        />
      </div>
    </div>
  );
};
