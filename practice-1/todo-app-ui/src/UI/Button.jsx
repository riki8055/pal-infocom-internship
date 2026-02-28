export default function Button({ type, variant, children, ...props }) {
  console.log("UI Button rendered");

  return (
    <button type={props.type} className={`btn btn-${variant}`} id={props.id}>
      {children}
    </button>
  );
}
