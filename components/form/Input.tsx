type DirectionVariant = "column" | "row";

const DIRECTION_CLASSES: Record<DirectionVariant, string> = {
  column: "flex-col",
  row: "flex-row items-center",
};

export function Input({
  label,
  className = "",
  direction = "column",
  onFocus,
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  direction?: DirectionVariant;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  const showPicker = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.showPicker();
  };

  const internalOnFocus = props.type === "date" ? showPicker : undefined;
  const handleFocus = onFocus ?? internalOnFocus;

  return (
    <div className={`flex ${DIRECTION_CLASSES[direction]} gap-2`}>
      {label && (
        <label className="text-sm text-gray-600 flex-shrink-0">{label}</label>
      )}

      <input
        className={`rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        onFocus={handleFocus}
        {...props}
      />
    </div>
  );
}
