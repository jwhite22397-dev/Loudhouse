import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { Beat } from '@/data/beats';

interface AudioContextType {
  currentBeat: Beat | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  playBeat: (beat: Beat) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  stopPlayback: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  }, []);

  const playBeat = useCallback(async (beat: Beat) => {
    try {
      if (currentBeat?.id === beat.id) {
        await togglePlayPause();
        return;
      }

      await unloadSound();
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

      const { sound } = await Audio.Sound.createAsync(
        { uri: beat.previewUrl },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
              setIsPlaying(false);
              setPosition(0);
            }
          }
        }
      );

      soundRef.current = sound;
      setCurrentBeat(beat);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [currentBeat, unloadSound, togglePlayPause]);

  const stopPlayback = useCallback(async () => {
    await unloadSound();
    setCurrentBeat(null);
    setIsPlaying(false);
    setPosition(0);
    setDuration(0);
  }, [unloadSound]);

  return (
    <AudioContext.Provider
      value={{ currentBeat, isPlaying, position, duration, playBeat, togglePlayPause, stopPlayback }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
