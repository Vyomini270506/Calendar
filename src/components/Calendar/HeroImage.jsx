import { motion } from "motion/react";

export default function HeroImage({ monthName, imageUrl, quote, author }) {
  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-full overflow-hidden group">
      <motion.div
        key={imageUrl}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <motion.img
          src={imageUrl}
          alt={monthName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 10, ease: "linear" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />

      <div className="absolute top-8 left-8 z-10">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-[1px] bg-white/60"
          />
          <span className="text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase">
            Life Goes On
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-8 left-8 z-10 flex flex-col items-end">
        <div className="mb-6 text-right w-full flex justify-end">
          <motion.h2
            key={monthName}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-[12vw] sm:text-6xl lg:text-5xl xl:text-7xl font-serif italic tracking-tighter whitespace-nowrap"
          >
            {monthName}
          </motion.h2>
        </div>

        <motion.div
          key={quote}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-xs lg:max-w-sm text-right"
        >
          <p className="text-white/90 font-serif italic text-sm lg:text-base leading-relaxed mb-2 drop-shadow-md">
            "{quote}"
          </p>
          <p className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase drop-shadow-md">
            — {author}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
