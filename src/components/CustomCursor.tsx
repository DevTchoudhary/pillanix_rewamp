import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const isCoarsePointer = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
};

const POINTER_SIZE = 18;
const ORB_SIZE = 52;
const FOLLOWER_LERP = 0.18;

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || isCoarsePointer()) return;

    const cursor = cursorRef.current;
    const orb = orbRef.current;

    if (!cursor || !orb) return;

    let animationFrame: number | null = null;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;
    let targetX = followerX;
    let targetY = followerY;

    const setVisibility = (visible: boolean) => {
      cursor.style.opacity = visible ? '1' : '0';
      orb.style.opacity = visible ? '0.65' : '0';
    };

    const updateFollower = () => {
      followerX += (targetX - followerX) * FOLLOWER_LERP;
      followerY += (targetY - followerY) * FOLLOWER_LERP;

      orb.style.transform = `translate3d(${followerX - ORB_SIZE / 2}px, ${followerY - ORB_SIZE / 2}px, 0)`;

      const distance = Math.hypot(targetX - followerX, targetY - followerY);
      const scale = 1 + Math.min(distance / 120, 0.35);
      orb.style.scale = scale.toString();

      animationFrame = requestAnimationFrame(updateFollower);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.style.transform = `translate3d(${targetX - POINTER_SIZE / 2}px, ${targetY - POINTER_SIZE / 2}px, 0)`;

      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(updateFollower);
      }

      document.querySelectorAll<HTMLElement>('.magnetic').forEach((element) => {
        const rect = element.getBoundingClientRect();
        const offsetX = targetX - (rect.left + rect.width / 2);
        const offsetY = targetY - (rect.top + rect.height / 2);
        const distance = Math.hypot(offsetX, offsetY);

        if (distance < 100) {
          const strength = (100 - distance) / 100;
          element.style.transform = `translate3d(${offsetX * 0.1 * strength}px, ${offsetY * 0.1 * strength}px, 0) scale(${1 + 0.02 * strength})`;
        } else {
          element.style.transform = '';
        }
      });
    };

    const handleMouseEnter = () => setVisibility(true);
    const handleMouseLeave = () => setVisibility(false);

    setVisibility(false);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    document.body.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((element) => {
        element.style.transform = '';
      });
      document.body.classList.remove('custom-cursor-active');
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || isCoarsePointer()) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="custom-cursor-pointer" aria-hidden />
      <div ref={orbRef} className="custom-cursor-orb" aria-hidden />
    </>
  );
};

export default CustomCursor;
