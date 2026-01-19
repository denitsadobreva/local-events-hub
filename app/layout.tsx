import "./globals.css";
import { inter } from "./fonts";
import Link from "next/link";
import Nav from "./components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="flex justify-between items-center p-4 bg-white p-6 mb-8 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.08)]">
          <Link href="/">
            <h2 className="text-xl text-gray-900 font-semibold">
              Local Events Hub
            </h2>
          </Link>

          <Nav />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
