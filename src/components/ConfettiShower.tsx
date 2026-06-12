import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  angle: number;
  scale: number;
}

export default function ConfettiShower({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = ["#ef4444", "#f43f5e", "#ec4899", "#f472b6", "#fb7185", "#fbcfe8", "#fbbf24"];
    const array: Particle[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: 100 + Math.random() * 20, // starts below screen
      size: Math.random() * 15 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      angle: Math.random() * 360 - 180,
      scale: Math.random() * 0.4 + 0.8,
    }));

    setParticles(array);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.x}vw`, 
              y: "110vh", 
              rotate: 0, 
              opacity: 0,
              scale: 0.1 
            }}
            animate={{
              y: "-15vh",
              x: `${p.x + (Math.random() * 20 - 10)}vw`,
              rotate: p.angle,
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0.1, p.scale, p.scale, p.scale * 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 2.5 + 2.5,
              delay: p.delay,
              ease: "easeOut",
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
            }}
          >
            {/* Render a Heart SVG particle */}
            <svg
              viewBox="0 0 24 24"
              fill={p.color}
              className="w-full h-full filter drop-shadow-sm opacity-90"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
