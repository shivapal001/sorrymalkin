import { useState, ChangeEvent } from "react";
import { motion } from "motion/react";
import { AppConfig, MemoryItem } from "../types";
import { 
  X, Save, Sparkles, Plus, Trash2, Image as ImageIcon, Music, Heart, Edit, FileText, Check 
} from "lucide-react";
import { playHeartChime } from "../utils/audioSynth";

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onUpdateConfig: (newConfig: AppConfig) => void;
}

const toneOptions = [
  { id: "emotional", name: "Deep & Poetical" },
  { id: "playful", name: "Playful & Filmy (Bollywood vibe)" },
  { id: "cute", name: "Cute, Soft & Pleading" },
  { id: "funny", name: "Humorous & Over-dramatic" }
];

const languageOptions = [
  { id: "Hinglish", name: "Hinglish (Hindi in English letters)" },
  { id: "English", name: "English" },
  { id: "Hindi", name: "Pure Hindi (हिंदी)" }
];

const presetSituations = [
  "Not replying to her messages on time",
  "Doing something silly or stupid by mistake",
  "Forgetting a special memory or date",
  "Talking rudely or behaving dryly by mistake",
  "Zubaan phisal gyi - minor misunderstanding",
  "Aisey hi bina wajah gussa ho gyi h"
];

export default function CustomizerModal({ isOpen, onClose, config, onUpdateConfig }: CustomizerModalProps) {
  const [localConfig, setLocalConfig] = useState<AppConfig>({ ...config });
  const [aiSituation, setAiSituation] = useState("");
  const [aiTone, setAiTone] = useState("emotional");
  const [aiLang, setAiLang] = useState("Hinglish");
  const [aiLoading, setAiLoading] = useState(false);
  const [newMemDate, setNewMemDate] = useState("");
  const [newMemTitle, setNewMemTitle] = useState("");
  const [newMemDesc, setNewMemDesc] = useState("");
  const [newMemEmoji, setNewMemEmoji] = useState("💖");

  const [activeTab, setActiveTab] = useState<"general" | "letter" | "memories" | "media">("general");

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateConfig(localConfig);
    playHeartChime();
    onClose();
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalConfig({
          ...localConfig,
          customPhoto: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAiApology = async () => {
    setAiLoading(true);
    playHeartChime();
    try {
      const response = await fetch("/api/write-poem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gfName: localConfig.gfName,
          bfName: localConfig.bfName,
          situation: aiSituation,
          style: aiTone,
          language: aiLang
        })
      });

      if (!response.ok) throw new Error("Could not connect to Cupid.");
      const data = await response.json();
      if (data.poem) {
        setLocalConfig({
          ...localConfig,
          sorryLetter: data.poem
        });
        setActiveTab("letter");
      }
    } catch (e) {
      alert("Uh oh! Gemini helper was busy, please write your feelings yourself! ❤️");
    } finally {
      setAiLoading(false);
    }
  };

  const addMemory = () => {
    if (!newMemDate || !newMemTitle || !newMemDesc) return;
    const newItem: MemoryItem = {
      id: Date.now().toString(),
      date: newMemDate,
      title: newMemTitle,
      description: newMemDesc,
      emoji: newMemEmoji
    };
    setLocalConfig({
      ...localConfig,
      memories: [...localConfig.memories, newItem]
    });
    setNewMemDate("");
    setNewMemTitle("");
    setNewMemDesc("");
    setNewMemEmoji("💖");
    playHeartChime();
  };

  const removeMemory = (id: string) => {
    setLocalConfig({
      ...localConfig,
      memories: localConfig.memories.filter(m => m.id !== id)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-rose-50"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 animate-pulse fill-white" />
            <h2 className="text-xl font-bold font-sans">Apocalypse Sorry Customizer</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 bg-slate-50 overflow-x-auto text-sm">
          {[
            { id: "general", name: "Basics", icon: Edit },
            { id: "letter", name: "Cupid Apology Letter", icon: FileText },
            { id: "memories", name: "Memory milestones", icon: Sparkles },
            { id: "media", name: "Image & Music", icon: Music }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-5 py-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  active 
                    ? "border-rose-500 text-rose-600 bg-white" 
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-rose-50/30"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-rose-500" : ""}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: GENERAL/BASICS */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Girlfriend's Name (Gussa Wali)
                  </label>
                  <input
                    type="text"
                    value={localConfig.gfName}
                    onChange={(e) => setLocalConfig({ ...localConfig, gfName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all font-sans"
                    placeholder="E.g. Simran, Sweety, Aisha"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Boyfriend's Name (Sorry Bolne Wala)
                  </label>
                  <input
                    type="text"
                    value={localConfig.bfName}
                    onChange={(e) => setLocalConfig({ ...localConfig, bfName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all font-sans"
                    placeholder="Your Name (E.g. Raj)"
                  />
                </div>
              </div>

              {/* Vercel Share Tip banner */}
              <div id="vercel-share-banner-tip" className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-2.5">
                <span className="text-lg">🚀</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-800 font-sans">Saras Vercel Sharing Tip!</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Customizations made here save in your local browser. To share this customized template with your girlfriend on Vercel, just click the <strong>&quot;Copy GF Link 🔗&quot;</strong> button in the top header. She will open your letters, names, and images instantly on her phone!
                  </p>
                </div>
              </div>

              {/* API Gemini Assistant block */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100">
                <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-3">
                  <Sparkles className="w-5 h-5 text-rose-600" />
                  <span>AI Romantic Apology writer</span>
                </div>
                <p className="text-xs text-slate-600 mb-4 tracking-normal leading-relaxed">
                  Let Gemini write the ultimate romantic poetry or letter based on what she is angry about. We'll automatically paste it into your Sorry Letter below!
                </p>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-rose-800 mb-1">What went wrong?</label>
                    <input
                      type="text"
                      value={aiSituation}
                      onChange={(e) => setAiSituation(e.target.value)}
                      placeholder="E.g. Replied late, was too busy, didn't notice her hair..."
                      className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-300 outline-none font-sans"
                    />
                    
                    {/* Presets situation buttons */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {presetSituations.map((pres, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setAiSituation(pres)}
                          className="text-[10px] bg-white text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full hover:bg-rose-100/50 cursor-pointer"
                        >
                          {pres}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-rose-800 mb-1">Tone style</label>
                      <select
                        value={aiTone}
                        onChange={(e) => setAiTone(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-rose-300 outline-none"
                      >
                        {toneOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-rose-800 mb-1">Language</label>
                      <select
                        value={aiLang}
                        onChange={(e) => setAiLang(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-rose-300 outline-none"
                      >
                        {languageOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={aiLoading}
                    onClick={generateAiApology}
                    className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-bold text-sm py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    {aiLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Cupid is composing your poem...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        <span>Generate Apology Poem ✨</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APOLOGY LETTER EDIT */}
          {activeTab === "letter" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Apology Letter Content (Handwritten style)
                </label>
                <textarea
                  value={localConfig.sorryLetter}
                  onChange={(e) => setLocalConfig({ ...localConfig, sorryLetter: e.target.value })}
                  rows={10}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none transition-all font-mono text-sm leading-relaxed"
                  placeholder="Apni feeling likho yahan..."
                />
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  This letter parses nicely inside the digital Envelope with handwritten Caveat typography.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE MEMORIES */}
          {activeTab === "memories" && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  Add New Special Moment / Date
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={newMemDate}
                    onChange={(e) => setNewMemDate(e.target.value)}
                    placeholder="Date (E.g. 14 Feb 2026)"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 outline-none font-sans"
                  />
                  <input
                    type="text"
                    value={newMemTitle}
                    onChange={(e) => setNewMemTitle(e.target.value)}
                    placeholder="Title (E.g. Humari Pehli Date)"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 outline-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
                  <input
                    type="text"
                    value={newMemDesc}
                    onChange={(e) => setNewMemDesc(e.target.value)}
                    placeholder="What happened? (E.g. We drank coffees and talked for 4 hours)"
                    className="sm:col-span-3 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-200 outline-none font-sans"
                  />
                  
                  <select
                    value={newMemEmoji}
                    onChange={(e) => setNewMemEmoji(e.target.value)}
                    className="px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-sm outline-none"
                  >
                    {["💖", "✨", "🍿", "☕", "🍕", "🎈", "🍫", "🚲", "🌹", "🧸", "✈️"].map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={addMemory}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-950 text-white font-bold text-xs py-2 px-5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Milestone</span>
                </button>
              </div>

              {/* Current memories list */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  Current memories Timeline ({localConfig.memories.length})
                </span>

                <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-2">
                  {localConfig.memories.map((mem) => (
                    <div key={mem.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{mem.emoji}</span>
                          <span className="text-xs text-rose-500 font-bold">{mem.date}</span>
                          <span className="text-sm font-bold text-slate-800 truncate">— {mem.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{mem.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMemory(mem.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {localConfig.memories.length === 0 && (
                    <p className="text-xs text-slate-400 text-center italic py-2">No memories added yet. Add one above! ❤️</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA (IMAGE & MUSIC) */}
          {activeTab === "media" && (
            <div className="space-y-4">
              {/* Photo settings */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Her Picture / Couple Photo
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  {/* Current picture preview */}
                  <div className="w-20 h-20 bg-rose-50 rounded-xl overflow-hidden shadow-md flex items-center justify-center border-2 border-rose-200">
                    {localConfig.customPhoto ? (
                      <img 
                        src={localConfig.customPhoto} 
                        alt="Sweetheart Preview" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-rose-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <p className="text-xs text-slate-600 font-medium">
                      Configure a custom photo to display on her digital love frame!
                    </p>
                    <div className="flex flex-col gap-1.5 matches-relative">
                      <label className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold text-center cursor-pointer transition-colors block">
                        Choose local picture file (png, jpg, etc.)
                        <input
                          id="local-file-photo-input"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        id="web-image-link-input"
                        type="text"
                        value={localConfig.customPhoto && !localConfig.customPhoto.startsWith("data:") ? localConfig.customPhoto : ""}
                        onChange={(e) => setLocalConfig({ ...localConfig, customPhoto: e.target.value })}
                        placeholder="Or Paste any Image Web Link (E.g. Imgur, Postimages)"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-rose-200 outline-none font-sans"
                      />
                      {localConfig.customPhoto && (
                        <button
                          id="reset-portrait-button"
                          type="button"
                          onClick={() => setLocalConfig({ ...localConfig, customPhoto: "" })}
                          className="text-[10px] text-red-500 hover:underline font-bold text-center mt-1"
                        >
                          Reset to default portrait
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Music Settings */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Romantic Background Soundtrack URL
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={localConfig.songUrl}
                    onChange={(e) => setLocalConfig({ ...localConfig, songUrl: e.target.value })}
                    placeholder="Enter MP3 audio link (e.g. from archive.org, pixabay, or public mp3)"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all font-sans text-sm"
                  />
                  
                  {/* Quick Preset Song suggestion */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Preset Backing Loops:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: "Sweet Soft Lullaby", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
                        { name: "Cinematic Guitar Loop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
                        { name: "Ambient Piano", url: "" }
                      ].map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLocalConfig({ ...localConfig, songUrl: s.url })}
                          className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            localConfig.songUrl === s.url 
                              ? "bg-rose-500 border-rose-500 text-white" 
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                    {localConfig.songUrl === "" && (
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 animate-pulse">
                        <Check className="w-3 h-3" /> Using highly soothing procedurally-synthesized romantic piano harp tunes instantly!
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t border-rose-100 p-5 flex items-center justify-end gap-2 text-sm font-sans font-bold">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Apply & Save Love Card</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
