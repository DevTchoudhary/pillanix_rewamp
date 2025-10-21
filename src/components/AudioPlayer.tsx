import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audioElement = new Audio();
    audioElement.src = 'https://assets.mixkit.co/music/download/mixkit-opalescent-ambient-135.mp3'; // Placeholder - you'll need to add actual music file
    audioElement.loop = true;
    audioElement.volume = 0.3;
    setAudio(audioElement);

    // Auto-play after first user interaction
    const handleFirstInteraction = () => {
      audioElement.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
      
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
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      title={isPlaying ? 'Mute Audio' : 'Play Audio'}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};

export default AudioPlayer;