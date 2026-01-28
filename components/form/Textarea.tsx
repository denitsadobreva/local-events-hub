type DirectionVariant = "column" | "row";

const DIRECTION_CLASSES: Record<DirectionVariant, string> = {
  column: "flex-col",
  row: "flex-row items-center",
};

export function Textarea({
  label,
  className = "",
  direction = "column",
  children,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  direction?: DirectionVariant;
}) {
  return (
    <div className={`flex ${DIRECTION_CLASSES[direction]} gap-2`}>
      {label && (
        <label className="text-sm text-gray-600 flex-shrink-0">{label}</label>
      )}

      <textarea
        className={`rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </textarea>
    </div>
  );
}
