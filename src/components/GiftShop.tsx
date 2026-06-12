import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Heart, Sparkles, Smile } from "lucide-react";
import { playHeartChime } from "../utils/audioSynth";

interface GiftShopProps {
  gfName: string;
}

const chocolateCompliments = [
  "You are the most beautiful girl in the universe! 💖",
  "Your smile instantly brightens up my worst days! 😊",
  "I love the way you get excited about little things! 🥺",
  "You have the warmest heart, and I am so lucky to have you. 🌸",
  "I am extremely sorry for making my favorite human sad. 😭",
  "I promise to always bring you chocolates when you are cross. 🍫",
];

export default function GiftShop({ gfName }: GiftShopProps) {
  const [roseOpened, setRoseOpened] = useState(false);
  const [hugged, setHugged] = useState(false);
  const [chocolatesOpened, setChocolatesOpened] = useState(false);
  const [unwrappedChoc, setUnwrappedChoc] = useState<number | null>(null);

  const handleRoseOpen = () => {
    setRoseOpened(true);
    playHeartChime();
  };

  const handleHug = () => {
    setHugged(true);
    playHeartChime();
    setTimeout(() => {
      setHugged(false);
    }, 4500);
  };

  const handleChocolateTap = (index: number) => {
    setUnwrappedChoc(index);
    playHeartChime();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto py-6 px-2">
      
      {/* Gift 1: Interactive Rose */}
      <div className="bg-white/80 backdrop-blur-md border border-rose-100 rounded-2xl p-6 flex flex-col items-center justify-between shadow-md relative overflow-hidden group">
        <div className="absolute top-2 right-2 flex items-center justify-center p-1 bg-red-50 rounded-full">
          <Sparkles className="w-4 h-4 text-rose-500 animate-spin-slow" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800">The Virtual Shahi Rose</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">A rose that will never wither, just like my love for you.</p>
        </div>

        <div className="h-44 flex items-center justify-center relative w-full">
          <AnimatePresence mode="wait">
            {!roseOpened ? (
              <motion.button
                key="closed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRoseOpen}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors shadow">
                  <Gift className="w-8 h-8 text-rose-500 animate-bounce" />
                </div>
                <span className="text-sm font-semibold text-rose-600">Apna Gift Kholo 🌹</span>
              </motion.button>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="flex flex-col items-center animate-rose-swag"
              >
                {/* SVG Majestic Blooming Rose Card */}
                <svg viewBox="0 0 100 100" className="w-32 h-32 text-rose-600 filter drop-shadow">
                  {/* Stem and Leaves */}
                  <path d="M50,45 L50,90" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M50,70 Q28,68 35,60 Q43,62 50,70" fill="#16a34a" />
                  <path d="M50,60 Q72,58 65,50 Q57,52 50,60" fill="#16a34a" />
                  
                  {/* Rose Layers with micro animations */}
                  <motion.g animate={{ scale: [0.9, 1.1, 1], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                    {/* Outer petals */}
                    <path d="M50,15 C20,10 20,45 50,55 C80,45 80,10 50,15 Z" fill="#b91c1c" opacity="0.8" />
                    {/* Middle Petals */}
                    <path d="M50,20 C30,16 30,40 50,48 C70,40 70,16 50,20 Z" fill="#dc2626" />
                    {/* Center details */}
                    <circle cx="50" cy="30" r="10" fill="#ef4444" />
                    <path d="M46,28 C46,24 54,24 54,28 C54,32 46,32 46,28 Z" fill="#f43f5e" />
                  </motion.g>
                </svg>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1 mt-2 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-heartbeat" /> Beautiful, just like you!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Gift 2: Cozy Interactive Hug */}
      <div className="bg-white/80 backdrop-blur-md border border-rose-100 rounded-2xl p-6 flex flex-col items-center justify-between shadow-md relative overflow-hidden group">
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800">Warm Jadoo Ki Jhappi</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">A giant comfortable hug to tell you sorry, we got this.</p>
        </div>

        <div className="h-44 flex items-center justify-center relative w-full">
          <AnimatePresence mode="wait">
            {!hugged ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHug}
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center shadow">
                  <Smile className="w-8 h-8 text-pink-500 animate-pulse" />
                </div>
                <span className="text-sm font-semibold text-pink-600">Tap for a Warm Hug 🤗</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex flex-col items-center text-center gap-2"
              >
                {/* Custom Big Teddy Interactive Hug */}
                <svg viewBox="0 0 100 100" className="w-32 h-32 text-indigo-100">
                  {/* Teddy outlines */}
                  <circle cx="34" cy="20" r="12" fill="#d97706" /> {/* Left Ear */}
                  <circle cx="66" cy="20" r="12" fill="#d97706" /> {/* Right Ear */}
                  <circle cx="34" cy="20" r="6" fill="#f59e0b" /> {/* Inner Left Ear */}
                  <circle cx="66" cy="20" r="6" fill="#f59e0b" /> {/* Inner Right Ear */}
                  <circle cx="50" cy="45" r="28" fill="#b45309" /> {/* Head */}
                  <circle cx="50" cy="53" r="10" fill="#f59e0b" /> {/* Muzzle */}
                  {/* Eyes */}
                  <circle cx="40" cy="38" r="3.5" fill="#000" />
                  <circle cx="60" cy="38" r="3.5" fill="#000" />
                  {/* Nose & Smile */}
                  <ellipse cx="50" cy="50" rx="4" ry="2.5" fill="#000" />
                  
                  {/* Giant animated hearts coming out */}
                  <path d="M50,56 Q45,62 50,68 Q55,62 50,56" stroke="#f43f5e" strokeWidth="2" fill="none" />

                  {/* Cuddling hand animations overlay */}
                  <motion.g
                    animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path d="M22,50 Q10,65 25,75" stroke="#92400e" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M78,50 Q90,65 75,75" stroke="#92400e" strokeWidth="8" strokeLinecap="round" fill="none" />
                  </motion.g>
                </svg>

                <p className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 animate-pulse-slow">
                  *Sends a massive, warm bear hug directly to {gfName}!*
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Gift 3: Chocolate Box with Compliment Unwrapping */}
      <div className="bg-white/80 backdrop-blur-md border border-rose-100 rounded-2xl p-6 flex flex-col items-center justify-between shadow-md relative overflow-hidden group">
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800">Swiss Assorted Chocolates</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Click each beautiful chocolate box to read cute reasons why I love you.</p>
        </div>

        <div className="h-44 flex items-center justify-center relative w-full">
          <AnimatePresence mode="wait">
            {!chocolatesOpened ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChocolatesOpened(true)}
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-amber-55 flex items-center justify-center shadow">
                  <Gift className="w-8 h-8 text-amber-600 animate-bounce" />
                </div>
                <span className="text-sm font-semibold text-amber-700">Open Chocolate Box 🍫</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="grid grid-cols-3 gap-2 p-2 bg-amber-950/10 rounded-xl border border-amber-900/10 mb-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleChocolateTap(index)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center relative shadow-sm cursor-pointer ${
                        unwrappedChoc === index
                          ? "bg-amber-100 border border-amber-300"
                          : "bg-gradient-to-br from-amber-700 to-amber-950 hover:from-amber-600 hover:to-amber-900"
                      }`}
                    >
                      {unwrappedChoc === index ? (
                        <span className="text-base">💝</span>
                      ) : (
                        <div className="absolute inset-1 border border-white/20 rounded-md flex items-center justify-center">
                          <span className="text-white/60 text-[9px] font-bold font-mono">🍫</span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="h-10 text-center flex items-center justify-center">
                  <p className="text-xs font-semibold text-amber-800 max-w-xs animate-pulse-slow">
                    {unwrappedChoc !== null 
                      ? chocolateCompliments[unwrappedChoc] 
                      : "Tap a chocolate to read your message! ✨"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
