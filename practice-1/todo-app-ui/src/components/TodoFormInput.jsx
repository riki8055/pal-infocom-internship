export default function TodoFormInput({ label, ...props }) {
  console.log("-- TodoFormInput rendered");

  if (props.type === "checkbox") {
    return (
      <div className="mb-3 form-check">
        <input {...props} className="form-check-input" />
        <label htmlFor={props.id} className="form-check-label">
          {label}
        </label>
      </div>
    );
  } else {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={props.id} className={props.className}>
            {label}
          </label>
        )}
        <input {...props} className={`form-control ${props.className || ""}`} />
      </div>
    );
  }
}
