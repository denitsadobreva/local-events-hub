import ShimmerBlock from "./ShimmerBlock";

export default function EventDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <ShimmerBlock className="h-6 w-1/3" />
      <ShimmerBlock className="h-4 w-2/3" />
      <ShimmerBlock className="h-4 w-5/6" />
      <ShimmerBlock className="h-4 w-1/3" />
    </div>
  );
}
