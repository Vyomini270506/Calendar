# Artisan Calendar

A responsive, interactive calendar application built with React and Vite. Designed to mimic the aesthetic of a premium, physical wall calendar with engaging visual transitions, memory journaling, and contextually-aware aesthetic flourishes.

## ✨ Features

- **Wall Calendar Aesthetic:** A beautifully balanced, asymmetrical layout pairing stunning hero images curated by month alongside a functional, bold timeline grid.
- **Dynamic Date Range Selection:** Intuitive click-to-select range mechanics allowing users to naturally bracket time periods with modern pill-shaped highlights seamlessly calculating timeline overlaps. 
- **Integrated Memory Journaling:** A synced `NotesPanel` allows for detailed logging. Any note added maps directly to the active date or range selection and caches securely using `localStorage`. 
- **Seasonal Particle Effects:** Generative `motion/react` particles invisibly layered on the screen that react to the currently displayed month. Transitions beautifully between snowfall ❄️, blooming cherry blossoms 🌸, summer fireflies ✨, and autumn leaves 🍂.
- **Fully Responsive Architecture:** Employs precise breakpoint design (`flex-col` collapsing into `lg:flex-row`). The calendar safely reflows on mobile devices while maintaining 100% of its usability. Responsive text scales guarantee that visually heavy month names (like September) adapt dynamically to container bounds and never overlap or truncate unpredictably.

## 🛠️ Technology Stack & Choices

* **Framework:** React 19 bootstrapped with Vite for instant server reload and modern module bundling.
* **Styling:** Tailwind CSS (v4) for utility-first precision and robust pseudo/breakpoint structuring. Tailwind kept the codebase exceedingly lightweight and bypassed the performance traps of large CSS-in-JS libraries. 
* **Animation:** `framer-motion` (via `motion/react`) is exclusively utilized for complex physics-based micro-interactions, container staging (via staggerChildren), layout persistence, and algorithmic floating particle effects.
* **Date Utilities:** `date-fns` for lightweight, immutable, and hyper-reliable chronological arithmetic (computing intervals, ranges, and offsets seamlessly).
* **Icons:** `lucide-react` mapping tightly to stroke-based icons.

## 🚀 How to Run Locally

1. **Ensure Prerequisites:** Check that you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Install Dependencies:** Open a terminal in the root of the project folder (`/Calendar`) and run:
   ```bash
   npm install
   ```
3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
4. **View the Application:**
   Open your browser and navigate to the local host address provided in the terminal (typically `http://localhost:3000` or `http://localhost:5173`).
