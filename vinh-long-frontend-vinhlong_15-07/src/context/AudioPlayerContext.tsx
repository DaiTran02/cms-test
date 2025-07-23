import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  RefObject,
  ReactNode,
} from 'react';

type AudioPlayerContextType = {
  audioRef: RefObject<HTMLAudioElement | null>;
  progressBarRef: RefObject<HTMLInputElement | null>;
  progressBarPopUpRef: RefObject<HTMLInputElement | null>;
  volumeBarRef: RefObject<HTMLInputElement | null>;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  mute: boolean;
  togglePlaying: () => void;
  onInitLoad: () => void;
  onEnded: () => void;
  convertAudioToPlayhead: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backFifteen: () => void;
  forwardFifteen: () => void;
  convertVolumeToPlayhead: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setMute: (value: boolean) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const progressBarPopUpRef = useRef<HTMLInputElement>(null);

  const volumeBarRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);

  const togglePlaying = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = volume / 100;
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };
  const onInitLoad = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (progressBarRef.current && progressBarPopUpRef.current) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBarRef.current.value = percent.toString();
        progressBarPopUpRef.current.value = percent.toString();
      }
    };
    audio.addEventListener('timeupdate', updateTime);
    // Clean up listener when component unmounts
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  };

  const onEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (progressBarRef.current && progressBarPopUpRef.current) {
      progressBarRef.current.value = '0';
      progressBarPopUpRef.current.value = '0';
    }
  };

  const convertAudioToPlayhead = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (!audio || !duration) return;

    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const convertVolumeToPlayhead = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (!audio) return;
    audio.volume = value / 100;
    setVolume(value);
    setMute(value === 0);
  };

  const backFifteen = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(audio.currentTime - 15, 0);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const forwardFifteen = () => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const newTime = Math.min(audio.currentTime + 15, duration);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  useEffect(() => {
    if (progressBarRef.current && progressBarPopUpRef.current) {
      progressBarRef.current.style.setProperty(
        '--seek-before-width',
        `${(currentTime / duration) * 100}%`
      );
      progressBarPopUpRef.current.style.setProperty(
        '--seek-before-width',
        `${(currentTime / duration) * 100}%`
      );
    }
    if (volumeBarRef.current) {
      volumeBarRef.current.style.setProperty(
        '--seek-before-width',
        `${volume}%`
      );
    }
  }, [currentTime, duration, volume]);

  return (
    <AudioPlayerContext.Provider
      value={{
        audioRef,
        progressBarRef,
        progressBarPopUpRef,
        volumeBarRef,
        isPlaying,
        duration,
        currentTime,
        volume,
        mute,
        togglePlaying,
        onInitLoad,
        onEnded,
        convertAudioToPlayhead,
        backFifteen,
        forwardFifteen,
        convertVolumeToPlayhead,
        setMute,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      'useAudioPlayerContext must be used within an AudioPlayerProvider'
    );
  }
  return context;
};
