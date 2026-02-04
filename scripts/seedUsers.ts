import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { hash } from "bcrypt-ts-edge";
import { randomUUID } from "crypto";

export const sql = neon(process.env.DATABASE_URL!);

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
};

const users: SeedUser[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password123",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
];

async function seedUsers() {
  console.log("Clearing users table...");
  await sql`DELETE FROM users`;

  console.log(`Seeding ${users.length} users...`);

  for (const user of users) {
    const hashedPassword = await hash(user.password, 10);

    await sql`
      INSERT INTO users (id, name, email, password, role)
      VALUES (
        ${randomUUID()},
        ${user.name},
        ${user.email},
        ${hashedPassword},
        ${user.role ?? "user"}
      )
    `;
  }

  console.log("Users seeding complete!");
}

seedUsers();
