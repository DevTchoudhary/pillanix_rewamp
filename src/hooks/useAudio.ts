import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export const useAudio = (src: string, volume: number = 0.3) => {
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create a simple background music URL (placeholder)
    const musicUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
    
    soundRef.current = new Howl({
      src: [musicUrl],
      volume: volume,
      loop: true,
      autoplay: false,
      onload: () => setIsLoaded(true),
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    // Auto-play after user interaction
    const handleFirstInteraction = () => {
      if (soundRef.current && isLoaded) {
        soundRef.current.play();
      }
      
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [volume, isLoaded]);

  const play = () => {
    if (soundRef.current && isLoaded) {
      soundRef.current.play();
    }
  };

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return { play, pause, toggle, isPlaying, isLoaded };
};