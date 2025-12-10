import ShimmerBlock from "./ShimmerBlock";

export default function EventCardSkeleton() {
  return (
    <li className="mb-4 flex flex-col gap-2 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl">
      <ShimmerBlock className="h-6 w-2/3" />
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-5/6" />
      <ShimmerBlock className="h-4 w-1/3" />
    </li>
  );
}
