import "./globals.css";
import { inter } from "./ui/fonts";
import Link from "next/link";
import Nav from "./ui/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="flex justify-between items-center p-4 bg-purple-50 p-6 mb-8">
          <Link href="/">
            <h2 className="text-xl text-purple-900">Local Events Hub</h2>
          </Link>

          <Nav />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
