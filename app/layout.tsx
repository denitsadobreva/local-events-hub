import "./globals.css";
import { inter } from "./ui/fonts";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="flex justify-between items-center p-4 bg-gray-200">
          <Link href="/">
            <h2>Local Events Hub</h2>
          </Link>

          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/events/new">Add New Event</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
