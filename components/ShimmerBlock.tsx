export default function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
    >
      <div
        className="
          absolute inset-0 -translate-x-1/2
          animate-[shimmer_2.5s_infinite]
          bg-gradient-to-r from-transparent via-white/80 to-transparent
        "
      />
    </div>
  );
}
