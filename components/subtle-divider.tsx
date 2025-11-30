export function Divider({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`
        h-px w-full
        bg-linear-to-r from-transparent via-primary-200/80 to-transparent
        dark:via-primary-700/80
        ${className}
      `}
      {...props}
    />
  );
}
