import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, Sparkles, Settings, Gift, RefreshCw, Star, Info, Smile, CheckCircle, Flame
} from "lucide-react";
import { AppConfig, MemoryItem, GiftStatus } from "./types";
import EnvelopeLetter from "./components/EnvelopeLetter";
import TimelineMemories from "./components/TimelineMemories";
import GiftShop from "./components/GiftShop";
import MusicVinyl from "./components/MusicVinyl";
import CustomizerModal from "./components/CustomizerModal";
import ConfettiShower from "./components/ConfettiShower";
import { playHeartChime } from "./utils/audioSynth";

// Default configuration with a romantic Hinglish setup
const DEFAULT_CONFIG: AppConfig = {
  gfName: "My Queen 👑",
  bfName: "Your Partner 🧸",
  sorryLetter: `Mujhe pata hai aap mujhse gussa ho, aur jab tak aap gusse me ho, mera din bilkul adhura hai. I am really, really sorry for my mistakes. 

Meri koi intention nahi thi aapka dil dukhane ki. Aap mere liye kitni special ho ye me sabdo me bayaan nahi kar sakta. Mera sabse bada sukoon aapka muskurana hai, aur jab aap gussa hoti ho toh dhakan rukh jaati h.

Please mujhe maaf kar do, Cutie! Ek pyaari si smile de do ab please! I love you so much! 🥺💖`,
  songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  customPhoto: "", // empty means fallback to sweet couple SVG
  memories: [
    {
      id: "1",
      date: "The First Connection 💬",
      title: "Jab Hum Pehli Baar Mile",
      description: "Starting our beautiful friendship through late-night texts, completely unaware how quickly we would become each other's world.",
      emoji: "💬"
    },
    {
      id: "2",
      date: "Aapki Magical Voice 🎙️",
      title: "Uski Voice... Ahyeeeee Hayeeeee! 💕",
      description: "Sunte hi dilon ki saari dooriyan ek dum khatam ho jati hain. Sach me, aapki voice sunkar dil ko jo sukoon milta hai vo sabse pyaara hai!",
      emoji: "🎙️"
    },
    {
      id: "3",
      date: "Late Night Gupshup 📞",
      title: "Infinite Hour-Long Calls",
      description: "When we talk till 4 AM in the morning about stars, our dreams, list of secrets, and yawn together.",
      emoji: "✨"
    }
  ]
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isForgiven, setIsForgiven] = useState(false);
  
  // States for interactive No button dodging
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noBtnHoverCount, setNoBtnHoverCount] = useState(0);
  const [noBtnText, setNoBtnText] = useState("Nahi! 😡");

  const noPhrases = [
    "Nahi! 😡",
    "Aise kaise? Maano pehle! 😾",
    "No option disabled! 😉",
    "Chocolates lagenge! 🍫",
    "Acha ab bas dosti? 🥺",
    "Galat button daba dala! ❌",
    "Heart says YES! ❤️",
    "Unlimited hugs chaiye kya? 🤗"
  ];

  // Load custom configurations on startup
  useEffect(() => {
    const saved = localStorage.getItem("romantic_sorry_config");
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleUpdateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem("romantic_sorry_config", JSON.stringify(newConfig));
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem("romantic_sorry_config");
    setConfig(DEFAULT_CONFIG);
    setIsForgiven(false);
    playHeartChime();
  };

  const handleForgiven = () => {
    setIsForgiven(true);
    playHeartChime();
  };

  const resetForgiven = () => {
    setIsForgiven(false);
    playHeartChime();
  };

  // Dodges the No button by setting random translations
  const dodgeNoButton = () => {
    const randomX = Math.random() * 160 - 80; // random pixel offsets
    const randomY = Math.random() * 120 - 60;
    setNoBtnPosition({ x: randomX, y: randomY });
    
    // Change pleadings
    const textIndex = (noBtnHoverCount + 1) % noPhrases.length;
    setNoBtnText(noPhrases[textIndex]);
    setNoBtnHoverCount(prev => prev + 1);
    playHeartChime();
  };

  return (
    <div className="min-h-screen bg-rose-50/40 relative overflow-x-hidden selection:bg-rose-200/50 pb-28">
      
      {/* Visual background soft heart grid patterns */}
      <div className="absolute inset-0 bg-radial-gradient from-rose-100/50 via-transparent to-transparent pointer-events-none" />

      {/* Floating Sparkly Rose Petals Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute animate-float-slower opacity-20 text-rose-500 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 95}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            🌸
          </span>
        ))}
      </div>

      {/* Confetti celebration when maanoes/forgives */}
      <ConfettiShower active={isForgiven} />

      {/* Primary Top Header Navigation Rail */}
      <header className="sticky top-0 bg-white/75 backdrop-blur-md border-b border-rose-100 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-serif font-bold text-slate-800 text-lg sm:text-xl tracking-wide">
            Meri Sorry Sweetheart Card 💌
          </span>
        </div>

        {/* Dashboard & Settings button toggler overlay */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetToDefaults}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full border border-slate-200 text-xs font-bold transition-all cursor-pointer"
            title="Reset to default voice template"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full border border-rose-200 text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4 animate-spin-slow" />
            <span className="hidden sm:inline">Customize Values</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 py-8 relative">
        
        {/* Intro Hero Frame Section */}
        <div className="text-center space-y-4 mb-12">
          
          {/* Couple Picture Frame */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl bg-pink-100/50 p-3 shadow-xl relative border-4 border-white ring-8 ring-rose-50/50 overflow-hidden transform hover:scale-103 transition-transform">
            
            <AnimatePresence mode="wait">
              {config.customPhoto ? (
                <motion.img
                  key="uploaded"
                  src={config.customPhoto}
                  alt="Our Beautiful Moments"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ) : (
                /* FALLBACK VECTOR ILLUSTRATION */
                <motion.div
                  key="fallback-svg"
                  className="w-full h-full bg-gradient-to-tr from-pink-300 to-rose-400 rounded-2xl flex flex-col items-center justify-center text-white relative p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-white drop-shadow-md">
                    {/* Double Hearts intertwined */}
                    <path d="M35 55c5.3-5.3 14-5.3 19.3 0l.7.7.7-.7c5.3-5.3 14-5.3 19.3 0 5.3 5.3 5.3 14 0 19.3l-20 20-20-20c-5.3-5.3-5.3-14 0-19.3z" fill="#f43f5e" />
                    <path d="M15 35c5.3-5.3 14-5.3 19.3 0l.7.7.7-.7c5.3-5.3 14-5.3 19.3 0 5.3 5.3 5.3 14 0 19.3l-20 20-20-20c-5.3-5.3-5.3-14 0-19.3z" fill="#f472b6" opacity="0.9" />
                  </svg>
                  <span className="text-xs uppercase tracking-widest font-bold font-sans mt-2 drop-shadow-xs">Peeps in Love 💖</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sparkly dynamic float corner sticker */}
            <div className="absolute top-1.5 right-1.5 bg-yellow-400 text-white p-1 rounded-full border border-white shadow-md animate-bounce">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
            </div>
          </div>

          <div className="space-y-1.5 max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-800 tracking-tight">
              Please Maaf Kar Do Na, <span className="text-rose-600 underline decoration-rose-200">{config.gfName || "Cutie"}</span>! 😭
            </h1>
            <p className="text-sm font-sans font-medium text-slate-500 leading-relaxed font-sans">
              I made a silly mistake, and my universe is totally silent without you. This interactive love card is for you to unwrap and heal our differences.
            </p>
          </div>
        </div>

        {/* SECTION 1: THE LETTER ENVELOPE */}
        <section className="mb-16">
          <EnvelopeLetter 
            gfName={config.gfName} 
            bfName={config.bfName} 
            sorryLetter={config.sorryLetter} 
          />
        </section>

        {/* SECTION 2: THE PLAYFUL FORGIVENESS GAME */}
        <section className="bg-white border-2 border-rose-100 rounded-3xl p-8 max-w-3xl mx-auto text-center shadow-xl relative overflow-hidden mb-16">
          
          {/* Aesthetic Background Grid lines */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400" />
          
          <AnimatePresence mode="wait">
            {!isForgiven ? (
              <motion.div
                key="not-forgiven"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-2xl font-serif font-black text-slate-800">
                    Will you forgive your silly partner, {config.gfName}? 🥺
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Choose wisely! The 'No' button is highly defensive, and love has already won the ballot.
                  </p>
                </div>

                {/* Game Button controls side by side */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 relative min-h-[140px]">
                  
                  {/* Real "YES" Forgivable Button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleForgiven}
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl font-sans font-bold text-lg shadow-lg shadow-rose-200 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
                  >
                    {/* Pulsing inner gradient */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Haan, bilkul Maaf kiya! 🥰</span>
                  </motion.button>

                  {/* Dodgeable "NO" Button with motion translate */}
                  <motion.button
                    animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    onMouseEnter={dodgeNoButton}
                    onTouchStart={dodgeNoButton}
                    className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-sans font-semibold text-sm border border-slate-200 cursor-pointer whitespace-nowrap opacity-90"
                  >
                    {noBtnText}
                  </motion.button>

                </div>
              </motion.div>
            ) : (
              /* TRIUMPH SUCCESS STAGE */
              <motion.div
                key="forgiven"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                tabIndex={0}
                className="space-y-6 py-6"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-serif font-black text-emerald-600 animate-bounce">
                    YAYY! I AM FORGIVEN! 🎉❤️
                  </h3>
                  <p className="text-sm font-sans font-medium text-slate-600 max-w-md mx-auto">
                    Thank you so much, {config.gfName}! Your beautiful smile is my richest reward. I promise to be better, love you infinitely!
                  </p>
                </div>

                {/* Secret apology signoff coupon unlocks */}
                <div className="max-w-md mx-auto bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 text-left">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block font-mono">Unwrapped Reward Coupon</span>
                  <h4 className="text-base font-bold text-slate-800 font-sans mt-0.5">🍫 Customized Love treats token!</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Present this card to your partner to claim **Unlimited Cuddles, complete home dinner prep with favorite pasta, and any chocolate of your choice** immediately!
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-emerald-100 mt-4 pt-3.5 text-xs font-bold text-slate-400">
                    <span>Coupon ID: SWEET-SORRY-99</span>
                    <button
                      onClick={resetForgiven}
                      className="text-[10px] text-rose-500 hover:underline cursor-pointer flex items-center gap-1 font-bold"
                    >
                      <RefreshCw className="w-3 h-3" /> Play game again
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SECTION 3: THE VIRTUAL GIFTS COMPONENT */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-black text-slate-800">
              Interactive Gifts Of Love 🎁
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Unwrap sweet chocolates, send cozy bear hugs, and bloom a deep ruby Shahi Rose to sweep her off her feet!
            </p>
          </div>
          
          <GiftShop gfName={config.gfName} />
        </section>

        {/* SECTION 4: TIMELINE MEMORIES */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-black text-slate-800">
              Humari Memory Lane 🗺️✨
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Looking back at where we started, why our love is worth more than any fight we ever have. 
            </p>
          </div>
          
          <TimelineMemories memories={config.memories} />
        </section>

      </main>

      {/* FLOATING VINYL SONG CONTROLLER */}
      <MusicVinyl songUrl={config.songUrl} />

      {/* CUSTOM BUILDER CONFIG DIALOG */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
      />
      
      {/* Absolute Bottom signature tags */}
      <footer className="absolute bottom-6 inset-x-0 text-center text-[11px] font-bold text-slate-400 select-none font-mono">
        Made with complete devotion & affection for your angry love! ❤️
      </footer>

    </div>
  );
}
