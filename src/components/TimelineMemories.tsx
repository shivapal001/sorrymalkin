import { motion } from "motion/react";
import { MemoryItem } from "../types";
import { Calendar, Sparkles } from "lucide-react";

interface TimelineProps {
  memories: MemoryItem[];
}

export default function TimelineMemories({ memories }: TimelineProps) {
  if (memories.length === 0) return null;

  return (
    <div className="relative py-8">
      {/* Connector Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-rose-200 via-pink-300 to-rose-200 rounded-full hidden md:block" />

      <div className="space-y-12">
        {memories.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center justify-between relative ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Central Node representing Sparkles */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-rose-500 border-4 border-white flex items-center justify-center shadow-md hidden md:flex z-10 animate-pulse-slow">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>

              {/* Memory Card */}
              <div className="w-full md:w-[45%] bg-white/75 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative ring-4 ring-rose-50/50">
                <div className="absolute top-4 right-4 text-3xl font-bold opacity-10">
                  {item.emoji}
                </div>
                
                <div className="flex items-center gap-2 text-rose-500 font-medium mb-2.5 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 tracking-tight font-sans mb-2">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed font-sans text-sm">
                  {item.description}
                </p>

                {/* Aesthetic corner rose */}
                <div className="absolute -bottom-1.5 -right-1.5 text-lg p-1 bg-rose-50 rounded-full border border-rose-100">
                  {item.emoji}
                </div>
              </div>

              {/* Empty Spacer For Desktop Grid Alignment */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
