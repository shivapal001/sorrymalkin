import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Heart, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { playHeartChime } from "../utils/audioSynth";

interface PromiseItem {
  id: number;
  title: string;
  subtitle: string;
  promiseText: string;
  icon: string;
}

const PROMISES_LIST: PromiseItem[] = [
  {
    id: 1,
    title: "1 Mahine Ka Sannaata Khatam",
    subtitle: "Never letting anger create distance again",
    promiseText: "Is 1 mahine ke sannaate ne mujhe andar se tod diya. Main vaada karta hoon, chahe kitni bhi badi ladai ho, main kabhi sannaata nahi hone doonga. Hum baat karke har problem solve karenge.",
    icon: "🕊️"
  },
  {
    id: 2,
    title: "Tumhari Har Baat Pehle Sununga",
    subtitle: "Listening with patience & empathy",
    promiseText: "Tumhara gussa, tumhari narazgi sab bilkul sahi hai. Main ab se bina kisi argument ke pehle tumhari poori baat sununga aur tumhari feeling respect karunga.",
    icon: "🎙️"
  },
  {
    id: 3,
    title: "Humesha Tumhara Hath Pakad Kar Rakhunga",
    subtitle: "Fighting the problems together, not each other",
    promiseText: "Ladai humare aur tumhare beech nahi hai, ladai misunderstanding se hai. Main humesha tumhara hath pakad ke rakhunga, chahe kitne bhi tufan aayein.",
    icon: "🤝"
  },
  {
    id: 4,
    title: "Tum Meri Pehli Aur Aakhri Priority Ho",
    subtitle: "You are Shivu's entire world",
    promiseText: "Mujhe duniya ki koi cheez, koi khushi nahi chahiye agar tum mere sath nahi ho. Is poore jahan mein mujhe bas Alishaaa chahiye.",
    icon: "👑"
  },
  {
    id: 5,
    title: "Har Din Tumhare Chehre Pe Muskaan",
    subtitle: "Bringing joy & warmth to your life",
    promiseText: "Main har wo koshish karunga jisse tumhare chehre par wahi purani pyaari si smile wapas aa jaye. Tumhari khushi meri sabse badi zimmedari hai.",
    icon: "✨"
  }
];

interface PromisesUnfoldProps {
  gfName: string;
  bfName: string;
}

export default function PromisesUnfold({ gfName, bfName }: PromisesUnfoldProps) {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);

  const togglePromise = (id: number) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds(prev => [...prev, id]);
      playHeartChime();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Unbreakable Vows & Promises</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-800">
          Shivu&apos;s 5 Sacred Promises To {gfName || "Alishaaa"} 💖
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
          Tap each promise card to unfold my solemn vows after our 1 month of silence.
        </p>
      </div>

      <div className="space-y-4">
        {PROMISES_LIST.map((item) => {
          const isUnlocked = unlockedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => togglePromise(item.id)}
              className={`rounded-2xl p-5 border transition-all cursor-pointer relative overflow-hidden ${
                isUnlocked
                  ? "bg-white border-rose-300 shadow-md ring-2 ring-rose-100"
                  : "bg-stone-50 hover:bg-rose-50/50 border-stone-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl p-2 bg-rose-50 rounded-xl border border-rose-100 shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
                      <span>Promise #{item.id}: {item.title}</span>
                      {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors shrink-0 ${
                  isUnlocked
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white text-slate-500 border-slate-200"
                }`}>
                  {isUnlocked ? "Unfolded ❤️" : "Tap to Unfold 📜"}
                </span>
              </div>

              {/* Unfolded Content animation */}
              <AnimatePresence>
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-3 border-t border-rose-100 text-slate-700 text-xs sm:text-sm leading-relaxed italic bg-rose-50/50 p-3.5 rounded-xl border-l-4 border-l-rose-500"
                  >
                    &quot;{item.promiseText}&quot;
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {unlockedIds.length === PROMISES_LIST.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1"
        >
          <span className="text-2xl">💍</span>
          <h4 className="text-sm font-bold text-emerald-800">All 5 Promises Unlocked & Signed by Shivu!</h4>
          <p className="text-xs text-emerald-600">
            &quot;I stand by every single word. Please forgive me, Alishaaa!&quot;
          </p>
        </motion.div>
      )}
    </div>
  );
}
