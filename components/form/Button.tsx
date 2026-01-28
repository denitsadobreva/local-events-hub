type ButtonVariant = "default" | "primary" | "confirm" | "danger";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: "bg-gray-200 hover:bg-gray-300",
  primary: "bg-blue-600 hover:bg-blue-700",
  confirm: "bg-green-600 hover:bg-green-700",
  danger: "bg-red-600 hover:bg-red-700",
};

export const Button = ({
  className = "",
  children,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) => {
  return (
    <button
      className={`text-white px-4 py-2 rounded cursor-pointer transition-colors duration-200 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
