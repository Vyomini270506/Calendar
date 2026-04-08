import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "motion/react";
import HeroImage from "./HeroImage";
import MonthGrid from "./MonthGrid";
import NotesPanel from "./NotesPanel";
import SeasonEffects from "./SeasonEffects";

const MONTH_DATA = {
  0: { image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1000", quote: "And now we welcome the new year. Full of things that have never been.", author: "Rainer Maria Rilke" },
  1: { image: "https://unsplash.com/blog/content/images/2023/03/wolfgang-hasselmann-E-lsG3EU4NA-unsplash.jpg", quote: "In the depth of winter I finally learned that there was in me an invincible summer.", author: "Albert Camus" },
  2: { image: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=1000", quote: "It was one of those March days when the sun shines hot and the wind blows cold: when it is summer in the light, and winter in the shade.", author: "Charles Dickens" },
  3: { image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000", quote: "April hath put a spirit of youth in everything.", author: "William Shakespeare" },
  4: { image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", quote: "All things seem possible in May.", author: "Edwin Way Teale" },
  5: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000", quote: "And what is so rare as a day in June? Then, if ever, come perfect days.", author: "James Russell Lowell" },
  6: { image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000", quote: "July is a blind date with summer.", author: "Hal Borland" },
  7: { image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1000", quote: "August rain: the best of the summer gone, and the new fall not yet born.", author: "Sylvia Plath" },
  8: { image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000", quote: "By all these lovely tokens September days are here, with summer's best of weather and autumn's best of cheer.", author: "Helen Hunt Jackson" },
  9: { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000", quote: "I'm so glad I live in a world where there are Octobers.", author: "L.M. Montgomery" },
  10: { image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000", quote: "November always seemed to me the Norway of the year.", author: "Emily Dickinson" },
  11: { image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1000", quote: "God gave us memory so that we might have roses in December.", author: "J.M. Barrie" }
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
    } else {
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange(prev => ({ ...prev, end: date }));
      }
    }
  };

  const handleAddNote = (content, date) => {
    const newNote = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      date: (date || currentDate).toISOString(),
      content
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] lg:p-12 p-4 flex items-center justify-center relative">
      <SeasonEffects month={currentDate.getMonth()} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-7xl bg-white shadow-2xl rounded-[2rem] overflow-hidden flex flex-col lg:flex-row min-h-[800px]"
      >
        <div className="lg:w-1/3 w-full border-r border-black/5">
          <HeroImage
            monthName={format(currentDate, "MMMM")}
            imageUrl={MONTH_DATA[currentDate.getMonth()].image}
            quote={MONTH_DATA[currentDate.getMonth()].quote}
            author={MONTH_DATA[currentDate.getMonth()].author}
          />
        </div>

        <div className="lg:w-2/5 w-full">
          <MonthGrid
            currentDate={currentDate}
            onDateClick={handleDateClick}
            onMonthChange={setCurrentDate}
            range={range}
          />
        </div>

        <div className="lg:w-4/15 flex-grow w-full">
          <NotesPanel
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            range={range}
            currentDate={currentDate}
          />
        </div>
      </motion.div>
    </div>
  );
}
