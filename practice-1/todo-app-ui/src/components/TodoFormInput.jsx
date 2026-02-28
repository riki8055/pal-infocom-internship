export default function TodoFormInput({ label, ...props }) {
  console.log("-- TodoFormInput rendered");

  if (props.type === "checkbox") {
    return (
      <div className="mb-3">
        <input type={props.type} id={props.id} />
        <label htmlFor={props.id}>Make it priority</label>
      </div>
    );
  } else {
    return (
      <div className="mb-3">
        <label htmlFor={props.id} className={props.className}>
          {label}
        </label>
        <input type={props.type} id={props.id} className="form-control" />
      </div>
    );
  }
}
