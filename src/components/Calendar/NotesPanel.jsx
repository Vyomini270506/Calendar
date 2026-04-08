import { format, isSameDay, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { Plus, Trash2, StickyNote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

export default function NotesPanel({ notes, onAddNote, onDeleteNote, range, currentDate }) {
  const [newNote, setNewNote] = useState("");

  const filteredNotes = notes.filter(note => {
    if (!range?.start) return true;
    
    const noteDate = new Date(note.date);
    if (range.start && !range.end) {
      return isSameDay(noteDate, range.start);
    }
    
    if (range.start && range.end) {
      const start = range.start < range.end ? range.start : range.end;
      const end = range.start < range.end ? range.end : range.start;
      try {
        return isWithinInterval(noteDate, { start: startOfDay(start), end: endOfDay(end) });
      } catch {
        return false;
      }
    }
    
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(newNote, range?.end || range?.start || undefined);
    setNewNote("");
  };

  const getHeaderTitle = () => {
    if (!range?.start) return "Journal";
    if (range.start && !range.end) return `Notes for ${format(range.start, "MMM d")}`;
    
    const start = range.start < range.end ? range.start : range.end;
    const end = range.start < range.end ? range.end : range.start;
    return `Notes ${format(start, "MMM d")} - ${format(end, "MMM d")}`;
  };

  return (
    <div className="p-8 lg:p-12 bg-[#fafafa] h-full flex flex-col border-l border-black/5">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-1"
        >
          <motion.div whileHover={{ rotate: 15 }}>
            <StickyNote className="w-8 h-4 text-black/40" />
          </motion.div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">
            Writing helps in remembering
          </span>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.h3
            key={range?.start ? (range?.end ? 'range' : 'single') : 'all'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl font-serif italic"
          >
            {getHeaderTitle()}
          </motion.h3>
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 relative z-10">
        <div className="relative">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={range?.start ? "Add a note for this period..." : "Add a general memo..."}
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 pr-16 text-sm focus:outline-none focus:border-black/30 transition-shadow transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="absolute right-2 z-20 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </form>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filteredNotes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-24"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <StickyNote className="w-12 h-12 text-black/5 mx-auto mb-4" />
              </motion.div>
              <p className="text-sm text-black/30 italic font-serif">Capture your thoughts...</p>
            </motion.div>
          ) : (
            <div className="space-y-4 pr-2">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="group bg-white p-5 rounded-2xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <p className="text-sm text-black/80 leading-relaxed font-medium">{note.content}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-1 h-1 bg-black/20 rounded-full" />
                        <span className="text-[10px] text-black/30 font-bold tracking-wider uppercase">
                          {format(new Date(note.date), "MMM d • h:mm a")}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDeleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-black/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
