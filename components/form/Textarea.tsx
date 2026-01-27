export const Textarea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => {
  return (
    <div>
      <label>{label}</label>
      <textarea {...props} />
    </div>
  );
};
