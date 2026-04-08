import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const generateParticles = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // viewport width percentage
    y: Math.random() * 100, // viewport height percentage for summer
    size: Math.random() * 10 + 5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));
};

export default function SeasonEffects({ month }) {
  const [particles, setParticles] = useState([]);
  
  let season = "";
  if ([11, 0, 1].includes(month)) season = "winter";
  else if ([2, 3, 4].includes(month)) season = "spring";
  else if ([5, 6, 7].includes(month)) season = "summer";
  else if ([8, 9, 10].includes(month)) season = "autumn";

  useEffect(() => {
    if (season === "winter") setParticles(generateParticles(60));
    else if (season === "spring") setParticles(generateParticles(40));
    else if (season === "summer") setParticles(generateParticles(40));
    else if (season === "autumn") setParticles(generateParticles(45));
  }, [season]);

  const renderParticles = () => {
    switch (season) {
      case "winter": // Snowflakes
        return particles.map((p) => (
          <motion.div
            key={`snow-${p.id}`}
            className="absolute bg-white rounded-full opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: p.size / 1.5, height: p.size / 1.5, left: `${p.x}%`, top: -30 }}
            animate={{
              y: ["0vh", "110vh"],
              x: [`${p.x}%`, `${p.x + (Math.random() * 5 + 5)}%`, `${p.x}%`] // sway
            }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
              x: { duration: p.duration / 2, repeat: Infinity, ease: "easeInOut", delay: p.delay }
            }}
          />
        ));
      case "spring": // Cherry blossoms/petals
        return particles.map((p) => (
          <motion.div
            key={`petal-${p.id}`}
            className="absolute bg-pink-300 shadow-sm"
            style={{ 
              width: p.size, 
              height: p.size, 
              left: `${p.x}%`, 
              top: -30,
              borderRadius: "50% 0 50% 0"
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [`${p.x}%`, `${p.x + 15}%`, `${p.x - 5}%`],
              rotate: [0, 180, 360],
            }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
              x: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay },
              rotate: { duration: p.duration / 3, repeat: Infinity, ease: "linear" }
            }}
          />
        ));
      case "summer": // Fireflies
        return particles.map((p) => (
          <motion.div
            key={`firefly-${p.id}`}
            className="absolute bg-yellow-200 rounded-full mix-blend-overlay shadow-[0_0_12px_4px_rgba(253,224,71,0.8)]"
            style={{ width: p.size / 2, height: p.size / 2, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{
              y: [`${p.y}%`, `${p.y - 8}%`, `${p.y + 5}%`, `${p.y}%`],
              x: [`${p.x}%`, `${p.x + 8}%`, `${p.x - 5}%`, `${p.x}%`],
              opacity: [0, 0.8, 0.2, 0.9, 0]
            }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay },
              x: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay },
              opacity: { duration: p.duration / 2, repeat: Infinity, ease: "easeInOut", delay: p.delay }
            }}
          />
        ));
      case "autumn": // Falling leaves
        return particles.map((p) => (
          <motion.div
            key={`leaf-${p.id}`}
            className="absolute bg-orange-600/60"
            style={{
              width: p.size * 1.2,
              height: p.size * 1.2,
              left: `${p.x}%`,
              top: -30,
              borderRadius: "100% 0 100% 0", // Leaf shape
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [`${p.x}%`, `${p.x - 20}%`, `${p.x + 10}%`],
              rotate: [0, 180, 270, 360],
            }}
            transition={{
              y: { duration: p.duration * 0.9, repeat: Infinity, ease: "linear", delay: p.delay },
              x: { duration: p.duration * 0.9, repeat: Infinity, ease: "easeInOut", delay: p.delay },
              rotate: { duration: p.duration / 2, repeat: Infinity, ease: "linear", delay: p.delay }
            }}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={season}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="w-full h-full absolute inset-0"
        >
          {renderParticles()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
