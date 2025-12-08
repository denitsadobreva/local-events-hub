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
  const activeLinkStyle = (href: string) =>
    pathname === href ? "text-purple-900 font-semibold" : "text-purple-800";

  return (
    <nav>
      <ul className="flex gap-4">
        {LINKS.map(({ href, label }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors duration-200 hover:text-purple-500 ${activeLinkStyle(
                  href
                )}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
