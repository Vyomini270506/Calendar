# My Awesome React Calendar

Hey there! Welcome to my calendar app. I built this using React and Vite. The goal was to make a calendar that doesn't just look boring and flat, but actually feels like a cool, premium wall calendar with some really fun interactive details. 

## What makes it cool?

- **Looks like a real calendar:** I set up the layout to have a big, beautiful image for every month right next to the calendar grid. It feels super clean and aesthetic.
- **Select any days you want:** You can easily pick a specific start date and end date. The app perfectly highlights the chunk of time you clicked on!
- **Built-in Journal:** There's a fully working sticky note area! Any memo you write gets saved automatically to your browser, so your thoughts don't disappear when you refresh the page. You can tie notes to specific days or an entire week.
- **Fun Season Effects:** As you click through the months, tiny weather particles float across the screen out of nowhere. You'll catch snowflakes in the winter, cherry blossom petals in the spring, fireflies in the summer, and falling leaves in the autumn.
- **Works on your phone too:** Whether you have a huge computer monitor or a tiny smartphone screen, the design automatically shrinks and stacks itself perfectly so you can always use it. 

## How I built it

I didn't want to use overly complicated tools. I wanted to keep it fast!

* **React + Vite:** I used React to build all the pieces (components) and Vite to make it run and load super quickly while I was coding.
* **Tailwind CSS:** Instead of writing hundreds of lines of confusing CSS files, I used Tailwind. It lets you style things easily and makes building custom websites way faster.
* **Framer Motion:** This is a super fun code library I used to make all the smooth animations and those cool floating weather particles.
* **Date-fns:** A super helpful tool that handles all the annoying math that comes with dates (like figuring out leap years or how many days are in exactly one month).
* **Lucide React:** This is where I got all the clean, simple icons you see around the app.

## How to run it on your own computer

If you want to play around with the code yourself, it's really easy:

1. **Get Node.js:** First, make sure you have [Node.js](https://nodejs.org/) installed on your computer (it's what lets the code run).
2. **Open the folder:** Open up this project folder (`/Calendar`) in your terminal or command prompt.
3. **Install the packages:** Run this command to download the libraries the app needs to work:
   ```bash
   npm install
   ```
4. **Start the app:** Once that finishes loading, run:
   ```bash
   npm run dev
   ```
5. **Open it up:** Your terminal will give you a local link (usually something like `http://localhost:5173` or `http://localhost:3000`). Just click it or paste it into your browser, and you're good to go!
