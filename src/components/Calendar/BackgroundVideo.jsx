import { motion, AnimatePresence } from "motion/react";

const SEASON_VIDEOS = {
  winter: "https://cdn.pixabay.com/video/2019/12/12/30116-379654154_large.mp4", // Winter snow
  spring: "https://cdn.pixabay.com/video/2021/04/13/70854-536417719_large.mp4", // Bloom
  summer: "https://cdn.pixabay.com/video/2020/07/28/45853-444458316_large.mp4", // Ocean / Summer
  autumn: "https://cdn.pixabay.com/video/2016/09/21/5551-184518774_large.mp4"  // Autumn forest
};

export default function BackgroundVideo({ month }) {
  let season = "";
  if ([11, 0, 1].includes(month)) season = "winter";
  else if ([2, 3, 4].includes(month)) season = "spring";
  else if ([5, 6, 7].includes(month)) season = "summer";
  else if ([8, 9, 10].includes(month)) season = "autumn";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#1a1a1a]">
      <AnimatePresence mode="wait">
        <motion.div
          key={season} // Wrapping video in div for reliable motion exit animation
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full absolute inset-0"
        >
          <video
            src={SEASON_VIDEOS[season]}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
