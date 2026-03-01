export default function Button({
  type = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  console.log("UI Button rendered");

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
