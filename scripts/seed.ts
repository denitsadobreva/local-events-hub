import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL!);

// helper function to generate a random date in 2025–2026
function randomDate() {
  const start = new Date(2025, 0, 1).getTime();
  const end = new Date(2026, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start))
    .toISOString()
    .slice(0, 10);
}

const titles = [
  "Music Festival",
  "Farmers Market",
  "Tech Conference",
  "Book Fair",
  "Wine Tasting",
  "Kids Art Workshop",
  "Startup Meetup",
  "Photography Walk",
  "Outdoor Cinema",
  "Street Food Festival",
  "Marathon",
  "Yoga in the Park",
  "Crafts Exhibition",
  "Jazz Night",
  "Science Expo",
  "Charity Run",
  "Board Games Meetup",
  "Robotics Workshop",
  "Cooking Class",
  "Film Premiere",
];

async function seed() {
  console.log("Clearing old data...");
  await sql`DELETE FROM events`;

  console.log("Seeding 100 events...");

  for (let i = 1; i <= 100; i++) {
    const title = `${titles[Math.floor(Math.random() * titles.length)]} #${i}`;
    const description =
      "A wonderful event where participants can enjoy activities, socialize and experience something new.";
    const event_date = randomDate();

    // Insert row by row (Neon is very fast, 100 inserts is fine)
    await sql`
      INSERT INTO events (title, description, event_date)
      VALUES (${title}, ${description}, ${event_date})
    `;
  }

  console.log("Seeding complete!");
}

seed();
