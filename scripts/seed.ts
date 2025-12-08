import { neon } from "@neondatabase/serverless";
import "dotenv/config"; // allows env vars in scripts

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // 1. Create events table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        event_date DATE NOT NULL
      );
    `;

    // 2. Insert example rows
    await sql`
      INSERT INTO events (title, description, event_date)
      VALUES
        ('Local Art Fair', 'A fun fair with local artists and crafts.', '2025-04-20'),
        ('Community Yoga Session', 'Morning outdoor yoga for beginners.', '2025-05-05'),
        ('Tech Meetup', 'Discussion + networking about new JS frameworks.', '2025-05-18');
    `;

    console.log("🌱 Seeding complete!");
  } catch (error) {
    console.error("❌ Error during seed:", error);
  }
}

seed();
