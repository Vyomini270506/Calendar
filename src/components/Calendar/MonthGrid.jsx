import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
  isToday
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MonthGrid({ currentDate, onDateClick, onMonthChange, range }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isInRange = (date) => {
    if (!range.start || !range.end) return false;
    try {
      return isWithinInterval(date, {
        start: range.start < range.end ? range.start : range.end,
        end: range.start < range.end ? range.end : range.start
      });
    } catch {
      return false;
    }
  };

  const isSelected = (date) => {
    return (range.start && isSameDay(date, range.start)) || (range.end && isSameDay(date, range.end));
  };

  return (
    <div className="p-8 lg:p-12 bg-white h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-12 gap-4">
        <div className="relative pt-6 min-w-0 flex-grow overflow-hidden">
          <span className="absolute top-0 left-0 text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">
            Timeline
          </span>
          <AnimatePresence mode="wait">
            <motion.h3
              key={currentDate.toISOString()}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[8vw] sm:text-3xl lg:text-4xl font-serif font-black tracking-tighter flex items-baseline whitespace-nowrap"
            >
              <span>{format(currentDate, "MMMM")}</span>
              <span className="text-black/10 ml-2">{format(currentDate, "yyyy")}</span>
            </motion.h3>
          </AnimatePresence>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onMonthChange(subMonths(currentDate, 1))}
            className="p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onMonthChange(addMonths(currentDate, 1))}
            className="p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-7 mb-4"
      >
        {weekDays.map((day) => (
          <motion.div
            key={day}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-[10px] font-bold tracking-widest text-black/40 uppercase text-center py-2"
          >
            {day}
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-7 gap-y-1 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDate.toISOString()}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.01
                }
              },
              exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
            }}
            className="grid grid-cols-7 col-span-7"
          >
            {calendarDays.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, monthStart);
              const selected = isSelected(day);
              const inRange = isInRange(day);
              const today = isToday(day);

              return (
                <motion.div
                  key={day.toString()}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                  }}
                  className="relative aspect-square flex items-center justify-center group"
                >
                  {inRange && isCurrentMonth && (
                    <motion.div
                      layoutId="range-bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`absolute inset-y-2 inset-x-0 bg-black/5 ${range.start && isSameDay(day, range.start) ? "rounded-l-full" : ""
                        } ${range.end && isSameDay(day, range.end) ? "rounded-r-full" : ""
                        }`}
                    />
                  )}

                  <motion.button
                    whileHover={{ scale: isCurrentMonth ? 1.1 : 1 }}
                    whileTap={{ scale: isCurrentMonth ? 0.95 : 1 }}
                    onClick={() => onDateClick(day)}
                    disabled={!isCurrentMonth}
                    className={`
                      relative z-10 w-10 h-10 flex items-center justify-center text-sm transition-all duration-300
                      ${!isCurrentMonth ? "text-transparent pointer-events-none" : "text-black/80"}
                      ${selected ? "bg-black text-white rounded-full shadow-lg scale-110" : "hover:bg-black/5 rounded-full"}
                      ${today && !selected ? "border border-black/20" : ""}
                    `}
                  >
                    {format(day, "d")}
                    {today && !selected && (
                      <motion.div
                        layoutId="today-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
