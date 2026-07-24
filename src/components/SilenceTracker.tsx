import { useState } from "react";
import { motion } from "motion/react";
import { Clock, Heart, Sparkles, Volume2, ShieldAlert } from "lucide-react";
import { playHeartChime } from "../utils/audioSynth";

interface SilenceTrackerProps {
  gfName: string;
  bfName: string;
}

export default function SilenceTracker({ gfName, bfName }: SilenceTrackerProps) {
  const [pulseActive, setPulseActive] = useState(false);

  const handlePulseHeart = () => {
    setPulseActive(true);
    playHeartChime();
    setTimeout(() => setPulseActive(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <div className="bg-gradient-to-br from-slate-900 via-stone-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-500/30 relative overflow-hidden">
        
        {/* Soft Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-500/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-500/20 rounded-xl border border-rose-500/30 text-rose-400">
              <Clock className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-300 font-mono">
                Distance & Silence Counter
              </h3>
              <p className="text-xs text-stone-400">Since our big fight</p>
            </div>
          </div>

          <div className="bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>1 Mahine Ka Sannaata 💔</span>
          </div>
        </div>

        {/* Main Countdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
            <span className="block text-3xl font-black font-serif text-rose-400">30+</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">Days</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
            <span className="block text-3xl font-black font-serif text-rose-300">720+</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">Hours</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
            <span className="block text-3xl font-black font-serif text-pink-300">43,200+</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">Minutes</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-rose-400 font-serif">1 Wish</span>
            <span className="text-[11px] font-bold text-stone-300">Bas {gfName || "Alishaaa"} ❤️</span>
          </div>
        </div>

        {/* Heartbeat & Emotional Statement */}
        <div className="bg-rose-900/30 border border-rose-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic font-serif">
              &quot;1 mahina ho gaya bina tumhari aawaz sune... Meri poori duniya tumhare bina adhuri aur sunsaan hai. Is duniya mein mujhe aur kuch nahi chahiye, bas tum chahiye {gfName || "Alishaaa"}.&quot;
            </p>
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest font-mono block">
              — From {bfName || "shivu"}&apos;s broken heart 💔
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePulseHeart}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              pulseActive
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/50"
                : "bg-white/10 hover:bg-white/20 text-rose-200 border border-rose-500/30"
            }`}
          >
            <Heart className={`w-4 h-4 text-rose-400 fill-rose-400 ${pulseActive ? "animate-ping" : "animate-pulse"}`} />
            <span>{pulseActive ? "Heart Beating for You! ❤️" : "Listen To Heartbeat"}</span>
          </motion.button>
        </div>

      </div>
    </div>
  );
}
