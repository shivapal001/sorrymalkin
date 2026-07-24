import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, Sparkles, Settings, Gift, RefreshCw, Star, Info, Smile, CheckCircle, Flame, Share2, Link
} from "lucide-react";
import { AppConfig, MemoryItem, GiftStatus } from "./types";
import EnvelopeLetter from "./components/EnvelopeLetter";
import TimelineMemories from "./components/TimelineMemories";
import GiftShop from "./components/GiftShop";
import MusicVinyl from "./components/MusicVinyl";
import CustomizerModal from "./components/CustomizerModal";
import ConfettiShower from "./components/ConfettiShower";
import SilenceTracker from "./components/SilenceTracker";
import PromisesUnfold from "./components/PromisesUnfold";
import ReunionGame from "./components/ReunionGame";
import { playHeartChime } from "./utils/audioSynth";

// Default configuration with Alishaaa and shivu - 1 Month Silence & Apology Story
const DEFAULT_CONFIG: AppConfig = {
  gfName: "Alishaaa",
  bfName: "shivu",
  sorryLetter: `Alishaaa, 1 mahina ho gaya hai hamari baat huye... Aur is poore ek mahine ne mujhe andar tak tod ke rakh diya hai. Mujhe acche se samajh aa gaya ki tumhare bina mera koi wajood nahi hai.

Mujhse bahut badi galti hui, humare beech itni badi ladai ho gayi, par sach yeh hai ki mera har ek din, har ek lamha tumhare bina adhura aur sunsaan hai. Main har pal tumhari aawaz sunne ke liye, tumhara naam sunne ke liye tarasta hoon.

Is poore jahan mein mujhe aur kuch nahi chahiye Alishaaa... Mujhe bas TUM chahiye. Please saare gusse ko pighla do, Shivu ko maaf kar do. Ek baar bas bol do ki sab theek hai... I love you more than words can ever say! 🥺💖`,
  songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  customPhoto: "https://www.image2url.com/r2/default/images/1781267411585-8c04ffe7-1acf-4e11-bcbe-7959242c3169.jpg",
  memories: [
    {
      id: "1",
      date: "Peheli Mulakaat 💬",
      title: "Jab Hum Pehli Baar Mile",
      description: "Starting our beautiful friendship through late-night texts, completely unaware how quickly we would become each other's entire universe.",
      emoji: "💬"
    },
    {
      id: "2",
      date: "Aapki Magical Voice 🎙️",
      title: "Uski Voice... Magical! 💕",
      description: "Sunte hi dilon ki saari dooriyan ek dum khatam ho jati hain. Shivu misses your sweet voice and laugh every single second.",
      emoji: "🎙️"
    },
    {
      id: "3",
      date: "1 Mahine Pehle 💔",
      title: "The Mistake & Big Fight",
      description: "Hamare beech ek galti se badi ladai ho gayi, and our entire universe fell completely silent.",
      emoji: "💔"
    },
    {
      id: "4",
      date: "30 Days of Darkness 🌙",
      title: "1 Month Without Talking",
      description: "30 days of complete silence proved to Shivu that life without Alishaaa is totally empty and meaningless.",
      emoji: "🥺"
    },
    {
      id: "5",
      date: "Today & Always 💍",
      title: "Shivu Asking Alishaaa Back",
      description: "Holding my hands together and pledging 5 sacred promises so we never fight or go silent ever again.",
      emoji: "❤️"
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

  const [copiedStatus, setCopiedStatus] = useState(false);

  // Load custom configurations on startup
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#love=")) {
      try {
        const encodedConfig = hash.substring(6);
        const decodedStr = decodeURIComponent(
          atob(encodedConfig)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decodedConfig = JSON.parse(decodedStr);
        if (decodedConfig && (decodedConfig.gfName || decodedConfig.sorryLetter)) {
          setConfig(decodedConfig);
          localStorage.setItem("romantic_sorry_config", JSON.stringify(decodedConfig));
          window.location.hash = "";
          alert("Surprise Loaded! 💖 Your partner sent you this customized love letter or sorry message.");
          return;
        }
      } catch (e) {
        console.error("Failed to parse shared config from URL hash", e);
      }
    }

    const saved = localStorage.getItem("romantic_sorry_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.gfName === "My Queen 👑" || parsed.gfName === "My Queen" || !parsed.gfName || parsed.gfName === "Alishaaa" || parsed.gfName === "shivu") {
          // Reset to newest default config including Alishaaa's portrait
          setConfig(DEFAULT_CONFIG);
          localStorage.removeItem("romantic_sorry_config");
        } else {
          setConfig(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setConfig(DEFAULT_CONFIG);
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

  const handleCopyShareLink = () => {
    let configToShare = { ...config };
    
    // Check if image is huge base64
    if (configToShare.customPhoto && configToShare.customPhoto.startsWith("data:")) {
      const confirmOk = window.confirm(
        "Aapne profile picture/photo computer se upload kiya h, which makes the shareable link too huge to send inside chat. For best results, edit karke Image Web Link paste karein. Do you still want to generate the link?"
      );
      if (!confirmOk) return;
    }

    try {
      const jsonStr = JSON.stringify(configToShare);
      const encoded = btoa(
        encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
          return String.fromCharCode(parseInt(p1, 16));
        })
      );
      const shareUrl = `${window.location.origin}${window.location.pathname}#love=${encoded}`;
      
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedStatus(true);
        playHeartChime();
        setTimeout(() => setCopiedStatus(false), 3000);
      });
    } catch (e) {
      console.error(e);
      alert("Failed to build shareable link. Please copy the URL from browser or try again!");
    }
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
            Sorry Malkin 💌
          </span>
        </div>

        {/* Dashboard & Settings button toggler overlay */}
        <div className="flex items-center gap-2.5">
          <button
            id="share-link-header-btn"
            onClick={handleCopyShareLink}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              copiedStatus 
                ? "bg-emerald-100 text-emerald-700 border border-emerald-300 animate-pulse" 
                : "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-sm hover:shadow"
            }`}
            title="Generate custom link for your girlfriend"
          >
            {copiedStatus ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Link Copied! 💖</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy GF Link 🔗</span>
              </>
            )}
          </button>
          <button
            id="reset-defaults-header-btn"
            onClick={handleResetToDefaults}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full border border-slate-200 text-xs font-bold transition-all cursor-pointer"
            title="Reset to default voice template"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
          <button
            id="customize-values-header-btn"
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
        <div className="text-center space-y-4 mb-8">
          
          {/* Couple Picture Frame */}
          <div className="w-52 h-52 sm:w-64 sm:h-64 mx-auto rounded-3xl bg-pink-100/50 p-3 shadow-2xl relative border-4 border-white ring-8 ring-rose-50/50 overflow-hidden transform hover:scale-102 transition-transform">
            
            <AnimatePresence mode="wait">
              {config.customPhoto ? (
                <motion.img
                  key="uploaded"
                  src={config.customPhoto}
                  alt="Alishaaa and Shivu"
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
                    <path d="M35 55c5.3-5.3 14-5.3 19.3 0l.7.7.7-.7c5.3-5.3 14-5.3 19.3 0 5.3 5.3 5.3 14 0 19.3l-20 20-20-20c-5.3-5.3-5.3-14 0-19.3z" fill="#f43f5e" />
                    <path d="M15 35c5.3-5.3 14-5.3 19.3 0l.7.7.7-.7c5.3-5.3 14-5.3 19.3 0 5.3 5.3 5.3 14 0 19.3l-20 20-20-20c-5.3-5.3-5.3-14 0-19.3z" fill="#f472b6" opacity="0.9" />
                  </svg>
                  <span className="text-xs uppercase tracking-widest font-bold font-sans mt-2 drop-shadow-xs">Peeps in Love 💖</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sparkly dynamic float corner sticker */}
            <div className="absolute top-2 right-2 bg-yellow-400 text-white p-1.5 rounded-full border border-white shadow-md animate-bounce">
              <Sparkles className="w-4 h-4 fill-white" />
            </div>
          </div>

          <div className="space-y-2 max-w-xl mx-auto pt-2">
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-800 tracking-tight">
              Please Maaf Kar Do Na, <span className="text-rose-600 underline decoration-rose-300">{config.gfName || "Alishaaa"}</span>! 😭💔
            </h1>
            <p className="text-sm font-sans font-medium text-slate-600 leading-relaxed">
              1 mahina ho gaya bina baat kiye... {config.bfName || "Shivu"} is missing you deeply and created this special hub to ask for your forgiveness.
            </p>
          </div>
        </div>

        {/* SECTION 1: SILENCE TRACKER & EMOTIONAL COUNTER */}
        <section className="mb-12">
          <SilenceTracker gfName={config.gfName} bfName={config.bfName} />
        </section>

        {/* SECTION 2: THE HEARTFELT LETTER ENVELOPE */}
        <section className="mb-12">
          <EnvelopeLetter 
            gfName={config.gfName} 
            bfName={config.bfName} 
            sorryLetter={config.sorryLetter} 
          />
        </section>

        {/* SECTION 3: REUNION GAME & RECONCILIATION GAUGE */}
        <section className="mb-12">
          <ReunionGame
            gfName={config.gfName}
            bfName={config.bfName}
            isForgiven={isForgiven}
            onForgiven={handleForgiven}
            onReset={resetForgiven}
          />
        </section>

        {/* SECTION 4: UNBREAKABLE PROMISES */}
        <section className="mb-12">
          <PromisesUnfold gfName={config.gfName} bfName={config.bfName} />
        </section>

        {/* SECTION 5: VIRTUAL GIFTS */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-black text-slate-800">
              Interactive Peace Offerings & Gifts 🎁
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Unwrap sweet chocolates, send cozy bear hugs, and bloom a deep ruby Shahi Rose to melt her anger!
            </p>
          </div>
          
          <GiftShop gfName={config.gfName} />
        </section>

        {/* SECTION 6: TIMELINE MEMORIES */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-black text-slate-800">
              Humari Memory Lane 🗺️✨
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Looking back at our journey, why our love is bigger than any fight or distance.
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
