import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { startAmbientLullaby, stopAmbientLullaby } from "../utils/audioSynth";

interface MusicVinylProps {
  songUrl: string;
}

export default function MusicVinyl({ songUrl }: MusicVinylProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // If the song url changes, check if we need to reload standard audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (songUrl) {
      audioRef.current = new Audio(songUrl);
      audioRef.current.loop = true;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current = null;
    }
  }, [songUrl]);

  const togglePlayback = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (songUrl) {
      // Handle standard audio playing
      if (audioRef.current) {
        if (nextState) {
          audioRef.current.play().catch(() => {
            // Fallback to synth if block by browser autoplay policies
            startAmbientLullaby(true, isMuted ? 0 : 0.4);
          });
        } else {
          audioRef.current.pause();
          stopAmbientLullaby();
        }
      }
    } else {
      // Use synthesized romantic backing tracks
      startAmbientLullaby(nextState, isMuted ? 0 : 0.4);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
    // Update ambient synth volume if no songUrl
    if (!songUrl && isPlaying) {
      stopAmbientLullaby();
      startAmbientLullaby(true, nextMute ? 0 : 0.4);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopAmbientLullaby();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-lg border border-rose-100 rounded-full px-4 py-2.5 shadow-xl flex items-center gap-3 select-none">
      
      {/* Mini Spinning Vinyl decoration */}
      <div className="relative w-10 h-10">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear"
          }}
          className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center relative shadow border-2 border-amber-900/30"
        >
          {/* Vinyl Ridges */}
          <div className="absolute inset-1.5 rounded-full border border-white/20" />
          <div className="absolute inset-3 rounded-full border border-white/10" />
          
          {/* Inner Label */}
          <div className="w-4 h-4 rounded-full bg-rose-500 border border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </motion.div>
        
        {isPlaying && (
          <span className="absolute -top-1.5 -right-1 text-[10px] animate-bounce text-rose-500 shadow-xs">
            🎵
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 capitalize font-mono tracking-widest">
          {isPlaying ? "Playing Romantic music" : "Music Paused"}
        </span>
        <span className="text-xs font-bold text-slate-700 truncate max-w-[130px]">
          {songUrl ? "Sufi Instrumental Loop" : "Procedural Cupid Chimes 💖"}
        </span>
      </div>

      <div className="flex items-center gap-1.5 ml-2 border-l border-slate-100 pl-2.5">
        
        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlayback}
          className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded-full cursor-pointer text-slate-500 transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-rose-50 text-rose-500" /> : <Play className="w-5 h-5 fill-slate-50 text-slate-500" />}
        </button>

        {/* Volume Mute Toggle Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded-full cursor-pointer text-slate-500 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
        </button>

      </div>
    </div>
  );
}
