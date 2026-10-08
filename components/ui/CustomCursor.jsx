import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

const PARTICLE_COLORS = ['#F97316', '#FACC15', '#22C55E', '#38BDF8', '#F472B6', '#A78BFA'];
const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [data-cursor="interactive"], .interactive';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 240, damping: 24, mass: 0.55 });
  const smoothY = useSpring(mouseY, { stiffness: 240, damping: 24, mass: 0.55 });
  const trailX = useSpring(mouseX, { stiffness: 110, damping: 20, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 110, damping: 20, mass: 0.8 });
  const shouldReduceMotion = useReducedMotion();
  const cursorX = useTransform(shouldReduceMotion ? mouseX : smoothX, (value) => value - 20);
  const cursorY = useTransform(shouldReduceMotion ? mouseY : smoothY, (value) => value - 20);
  const trailLeft = useTransform(trailX, (value) => value - 28);
  const trailTop = useTransform(trailY, (value) => value - 28);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return undefined;

    document.documentElement.classList.add('blokuma-custom-cursor');
    let hovering = false;

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;

      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);

      const nextHovering = Boolean(event.target.closest?.(INTERACTIVE_SELECTOR));
      if (nextHovering !== hovering) {
        hovering = nextHovering;
        setIsHovering(nextHovering);
      }
    };

    const handlePointerDown = (event) => {
      if (event.pointerType === 'touch') return;

      setIsMouseDown(true);
      if (shouldReduceMotion) return;

      const burst = PARTICLE_COLORS.map((color, index) => ({
        id: particleId.current++,
        color,
        x: event.clientX,
        y: event.clientY,
        angle: (Math.PI * 2 * index) / PARTICLE_COLORS.length,
      }));
      setParticles((current) => [...current, ...burst]);
    };

    const handlePointerUp = () => setIsMouseDown(false);
    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      setIsMouseDown(false);
      hovering = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      document.documentElement.classList.remove('blokuma-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  useEffect(() => {
    if (particles.length === 0) return undefined;

    const timer = window.setTimeout(() => setParticles([]), 650);
    return () => window.clearTimeout(timer);
  }, [particles]);

  return (
    <>
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[9998] h-14 w-14 rounded-full border-[3px] border-pink-300/80"
          style={{
            x: trailLeft,
            y: trailTop,
            opacity: isVisible ? 0.75 : 0,
            boxShadow: '0 0 18px rgba(244, 114, 182, 0.35)',
          }}
          animate={{ scale: isHovering ? 1.35 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        />
      )}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] grid h-10 w-10 place-items-center rounded-full border-[3px] border-white bg-gradient-to-br from-amber-300 via-orange-400 to-pink-400 shadow-[0_4px_0_rgba(194,65,12,0.28),0_0_18px_rgba(251,146,60,0.55)]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isMouseDown ? 0.82 : isHovering ? 1.25 : 1 }}
        transition={{ type: 'spring', stiffness: 360, damping: 16 }}
      >
        <span className="text-[19px] leading-none drop-shadow-sm">★</span>
      </motion.div>

      {!shouldReduceMotion && (
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-[10000] h-2.5 w-2.5 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                marginLeft: -5,
                marginTop: -5,
              }}
              initial={{ opacity: 1, scale: 0.4 }}
              animate={{
                x: Math.cos(particle.angle) * 34,
                y: Math.sin(particle.angle) * 34,
                opacity: 0,
                scale: 1.3,
                rotate: 120,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      )}

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html.blokuma-custom-cursor,
          html.blokuma-custom-cursor * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
