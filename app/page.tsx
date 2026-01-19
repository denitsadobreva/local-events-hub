import { lusitana } from "./fonts";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Local Events Hub</h1>
        <p className="text-gray-600 mb-6">
          Discover, explore and create local events in your community.
        </p>
        <Link
          href="/events"
          className="cursor-pointer inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors duration-200 "
        >
          Browse All Events
        </Link>
      </section>
    </main>
  );
}
