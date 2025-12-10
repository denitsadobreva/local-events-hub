import Link from "next/link";

export default function EventDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link
        href="/events"
        className="text-gray-800 hover:text-gray-600 ml-10 mb-4"
      >
        &larr; Back to All Events
      </Link>
      <div>{children}</div>
    </div>
  );
}
