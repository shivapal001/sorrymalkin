import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, CheckCircle, RefreshCw, Flame, Award, Gift } from "lucide-react";
import { playHeartChime } from "../utils/audioSynth";

interface ReunionGameProps {
  gfName: string;
  bfName: string;
  onForgiven: () => void;
  isForgiven: boolean;
  onReset: () => void;
}

export default function ReunionGame({ gfName, bfName, onForgiven, isForgiven, onReset }: ReunionGameProps) {
  const [meter, setMeter] = useState<number>(0);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noBtnCount, setNoBtnCount] = useState(0);

  const noPhrases = [
    "Nahi! Abhi gussa baaki h 😾",
    "1 mahine ka badla baki h! 😡",
    "Pehle ice cream khilao! 🍦",
    "1000 hugs lagenge! 🤗",
    "No button disabled by Shivu! 😉",
    "Heart says YES! ❤️",
    "Acha bas aakhri baar maaf kiya! 🥺"
  ];

  const dodgeNoButton = () => {
    const rx = Math.random() * 160 - 80;
    const ry = Math.random() * 100 - 50;
    setNoBtnPosition({ x: rx, y: ry });
    setNoBtnCount(prev => prev + 1);
    playHeartChime();
  };

  const addLove = (amount: number) => {
    const next = Math.min(100, meter + amount);
    setMeter(next);
    playHeartChime();
    if (next >= 100 && !isForgiven) {
      onForgiven();
    }
  };

  return (
    <div className="bg-white border-2 border-rose-100 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto text-center shadow-xl relative overflow-hidden my-12">
      
      {/* Decorative Gradient Bar */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500" />

      <AnimatePresence mode="wait">
        {!isForgiven ? (
          <motion.div
            key="game-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center shadow-inner">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-800">
                Bring {gfName || "Alishaaa"} Back To {bfName || "Shivu"} 💖
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                After 1 month of dark silence, fill up the Reunion Love Gauge to 100% to forgive Shivu & unlock our reunion certificate!
              </p>
            </div>

            {/* Meter Progress Bar */}
            <div className="max-w-md mx-auto space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600 font-mono">
                <span>Reunion Gauge: {meter}%</span>
                <span>{meter === 100 ? "Reunited! 🎉" : `${100 - meter}% left to melt her heart`}</span>
              </div>
              <div className="w-full h-5 bg-rose-100 rounded-full p-1 border border-rose-200 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-full flex items-center justify-end pr-2 text-[10px] font-bold text-white shadow-sm"
                  animate={{ width: `${meter}%` }}
                  transition={{ type: "spring", stiffness: 80 }}
                >
                  {meter > 15 && `${meter}%`}
                </motion.div>
              </div>
            </div>

            {/* Interactive Love Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto py-2">
              <button
                onClick={() => addLove(25)}
                className="p-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 transition-all cursor-pointer flex flex-col items-center gap-1 shadow-xs hover:shadow"
              >
                <span className="text-xl">🌸</span>
                <span>Send 1 Smile (+25%)</span>
              </button>

              <button
                onClick={() => addLove(25)}
                className="p-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-2xl text-xs font-bold text-pink-700 transition-all cursor-pointer flex flex-col items-center gap-1 shadow-xs hover:shadow"
              >
                <span className="text-xl">🤗</span>
                <span>Send Hug (+25%)</span>
              </button>

              <button
                onClick={() => addLove(25)}
                className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl text-xs font-bold text-amber-800 transition-all cursor-pointer flex flex-col items-center gap-1 shadow-xs hover:shadow"
              >
                <span className="text-xl">🍫</span>
                <span>Chocolate (+25%)</span>
              </button>

              <button
                onClick={() => addLove(25)}
                className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 transition-all cursor-pointer flex flex-col items-center gap-1 shadow-xs hover:shadow"
              >
                <span className="text-xl">💖</span>
                <span>Forgive 25% (+25%)</span>
              </button>
            </div>

            {/* Big "YES MAAF KIYA" or "100% INSTANT FORGIVE" Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative min-h-[120px]">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addLove(100)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl font-sans font-bold text-base shadow-lg shadow-rose-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>Haan Shivu, Aakhri Baar Maaf Kiya! 🥰</span>
              </motion.button>

              <motion.button
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-sans font-semibold text-xs border border-slate-200 cursor-pointer whitespace-nowrap opacity-90"
              >
                {noPhrases[noBtnCount % noPhrases.length]}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* REUNION TRIUMPH CERTIFICATE STAGE */
          <motion.div
            key="forgiven-certificate"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6 py-4"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-300 shadow-md">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-serif font-black text-emerald-600 animate-bounce">
                ALISHAAA & SHIVU REUNITED! 🎉❤️
              </h3>
              <p className="text-sm font-sans font-medium text-slate-600 max-w-md mx-auto">
                Thank you so much, {gfName}! Your forgiveness means the entire universe to Shivu. The 1 month of silence is finally over!
              </p>
            </div>

            {/* Official Reunion Certificate Card */}
            <div className="max-w-md mx-auto bg-amber-50/80 p-6 rounded-3xl border-4 border-amber-200 shadow-lg text-left relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-200/50 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-700" />
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-widest font-mono">
                    Reunion Certificate
                  </span>
                </div>
                <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Valid Forever ♾️
                </span>
              </div>

              <h4 className="text-base font-bold text-stone-900 font-serif">
                📜 Certificate of Eternal Forgiveness & Love
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed mt-1 font-sans">
                This certifies that <strong>{gfName}</strong> has officially forgiven <strong>{bfName}</strong> after 30 days of separation. No fight shall ever pull them apart again!
              </p>

              <div className="bg-white/70 p-3 rounded-xl border border-amber-200/70 mt-3 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">🎁 Shivu&apos;s Redemption Tokens Unlocked:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                  <li>Unlimited Warm Cuddles & Long Hugs 🤗</li>
                  <li>Late Night Phone Calls & Zero Arguments 📞</li>
                  <li>Ice Cream Date + Favorite Meal Prep 🍨</li>
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-amber-200 mt-4 pt-3 text-[11px] font-bold text-stone-500">
                <span>Pledged by: {bfName} ❤️</span>
                <button
                  onClick={onReset}
                  className="text-rose-500 hover:underline cursor-pointer flex items-center gap-1 font-bold"
                >
                  <RefreshCw className="w-3 h-3" /> Replay Game
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
