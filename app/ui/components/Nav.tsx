"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/events/new", label: "Add New Event" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-4 text-purple-800">
        {LINKS.map(({ href, label }) => {
          return (
            <Link
              key={href}
              href={href}
              className={`hover:text-purple-500 ${
                pathname === href && "text-purple-300"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
