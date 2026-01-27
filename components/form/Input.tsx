export const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
};
