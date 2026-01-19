import EventsSkeleton from "@/components/EventsSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Events</h1>

      <ul className="grid gap-6 w-full grid-cols-3">
        <EventsSkeleton />
        <EventsSkeleton />
        <EventsSkeleton />
      </ul>
    </div>
  );
}
