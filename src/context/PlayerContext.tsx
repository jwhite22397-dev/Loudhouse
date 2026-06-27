import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from 'expo-audio';
import { Beat } from '../data/types';

interface PlayerContextValue {
  current: Beat | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  playBeat: (beat: Beat) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  stop: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const playerRef = useRef<AudioPlayer | null>(null);
  const [current, setCurrent] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    const player = createAudioPlayer(null, { updateInterval: 500 });
    playerRef.current = player;

    const sub = player.addListener('playbackStatusUpdate', (status) => {
      setIsPlaying(status.playing);
      setPosition(status.currentTime ?? 0);
      if (status.duration && !Number.isNaN(status.duration)) {
        setDuration(status.duration);
      }
      if (status.didJustFinish) {
        player.seekTo(0).catch(() => {});
        player.pause();
        setIsPlaying(false);
      }
    });

    return () => {
      sub.remove();
      player.remove();
    };
  }, []);

  const playBeat = useCallback(
    (beat: Beat) => {
      const player = playerRef.current;
      if (!player) return;
      if (current?.id === beat.id) {
        player.play();
        setIsPlaying(true);
        return;
      }
      setCurrent(beat);
      setPosition(0);
      setDuration(0);
      try {
        player.replace({ uri: beat.audioUrl });
        player.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    },
    [current]
  );

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player || !current) return;
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  }, [isPlaying, current]);

  const seek = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds).catch(() => {});
    setPosition(seconds);
  }, []);

  const stop = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.pause();
    player.seekTo(0).catch(() => {});
    setIsPlaying(false);
    setCurrent(null);
    setPosition(0);
  }, []);

  const value = useMemo(
    () => ({ current, isPlaying, position, duration, playBeat, togglePlay, seek, stop }),
    [current, isPlaying, position, duration, playBeat, togglePlay, seek, stop]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = (): PlayerContextValue => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
