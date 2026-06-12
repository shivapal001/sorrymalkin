import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen } from "lucide-react";
import { playHeartChime } from "../utils/audioSynth";

interface EnvelopeLetterProps {
  gfName: string;
  bfName: string;
  sorryLetter: string;
}

export default function EnvelopeLetter({ gfName, bfName, sorryLetter }: EnvelopeLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    playHeartChime();
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* CLOSED ENVELOPE STAGE */
          <motion.div
            key="closed-envelope"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={handleOpen}
              className="relative w-full max-w-lg bg-gradient-to-br from-rose-600 to-rose-700 rounded-3xl p-8 shadow-2xl cursor-pointer overflow-hidden border-4 border-rose-300 group ring-8 ring-rose-50/50"
            >
              {/* Backlight Glow inside Envelope */}
              <div className="absolute inset-0 bg-radial-gradient from-rose-500/10 via-transparent to-transparent opacity-80" />

              {/* Decorative Stamp/Wax Seal */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 bg-yellow-505 bg-amber-400 hover:bg-yellow-400 p-5 rounded-full border-4 border-white shadow-lg animate-pulse-slow active:scale-95 transition-all">
                <span className="text-white text-3xl">💝</span>
              </div>

              {/* Envelope flap lines styled using SVGs */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L50,48 L100,0" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                <path d="M0,100 L45,50" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                <path d="M100,100 L55,50" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
              </svg>

              <div className="flex flex-col items-center justify-center py-16 text-center text-white relative z-10 select-none">
                <Mail className="w-14 h-14 text-rose-100 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                <h2 className="text-2xl font-bold font-serif mb-2 tracking-wide">
                  Ek Pyaara Message Aapke Liye... 💌
                </h2>
                <p className="text-sm text-rose-100 font-sans tracking-wide">
                  Hlo {gfName || "My Love"}, please click to break the seal and read my feelings.
                </p>
                <span className="text-rose-100 text-xs font-mono tracking-widest uppercase mt-12 bg-rose-850/40 px-3.5 py-1.5 rounded-full border border-rose-500/30">
                  Click to open
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* OPEN LETTER STAGE */
          <motion.div
            key="open-letter"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full flex flex-col items-center"
          >
            {/* The unfolded paper letter */}
            <div className="w-full max-w-xl paper-bg bg-amber-50 rounded-3xl p-8 shadow-2xl relative border-8 border-stone-200/50 before:absolute before:inset-1 before:border-2 before:border-rose-100/40 before:rounded-[inherit]">
              
              {/* Envelope Header Icon */}
              <div className="flex justify-between items-center border-b border-rose-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <MailOpen className="w-5 h-5 text-rose-500" />
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400 font-mono">
                    My True Feelings
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full border border-rose-200/70 cursor-pointer font-sans transition-colors"
                >
                  Close Letter
                </button>
              </div>

              {/* Real paper aesthetics: handwriting style */}
              <div className="text-stone-800 font-serif leading-relaxed text-lg min-h-[300px]">
                
                {/* Salutation */}
                <p className="font-handwritten text-3xl text-rose-600 font-bold ml-1 mb-6">
                  Dearest {gfName || "Sweetheart"},
                </p>

                {/* Main Customized Message Body */}
                <div className="whitespace-pre-line font-handwritten text-stone-700 text-2xl font-medium tracking-wide leading-relaxed pl-3 pr-2 select-text selection:bg-rose-200/70">
                  {sorryLetter || `Mujhe pata hai aap mujhse gussa ho, aur jab tak aap gusse me ho, mera din bilkul adhura hai. I am really, really sorry for my mistakes. 

Meri koi intention nahi thi aapka dil dukhane ki. Aap mere liye kitni special ho ye me sabdo me bayaan nahi kar sakta. Mera sabse bada sukoon aapka muskurana hai. 

Please mujhe maaf kar do, Cutie! Ek pyaari si smile de do ab please! 🥺💖`}
                </div>

                {/* Warm Signoff */}
                <div className="mt-10 pt-4 border-t border-rose-100/70 flex flex-col items-end">
                  <p className="text-sm uppercase tracking-wider font-bold text-slate-400 font-mono mb-1">
                    Always Yours,
                  </p>
                  <p className="font-handwritten text-4xl text-rose-600 font-bold tracking-wider mr-2">
                    {bfName || "Your Partner"}
                  </p>
                </div>

              </div>

              {/* Heart signature seal details */}
              <div className="absolute -bottom-4 right-1/2 transform translate-x-1/2 w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white text-base border-2 border-white shadow-md animate-pulse">
                ❤️
              </div>
            </div>
            
            {/* Guide hint */}
            <p className="text-xs text-rose-400 font-sans tracking-wide mt-4 italic">
              Scroll down to give sweet interactive gifts and play the Forgiveness Game! 👇
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
