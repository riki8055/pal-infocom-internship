export default function DropDownBtns({ todos, onRemovePriority }) {
  console.log("- DropDownBtnsRendered");

  const dropDownActions = [
    {
      id: "removePriorityBtn",
      label: "Remove ToDo at priority",
      onClick: onRemovePriority,
    },
    { id: "popOutBtn", label: "Pop out last ToDo" },
    { id: "clearRangeBtn", label: "Delete ToDo in a range" },
  ];

  return (
    <ul class="dropdown-menu dropdown-menu-dark">
      {dropDownActions.map((action) => (
        <li key={action.id}>
          <button
            class="dropdown-item btn"
            href="#"
            id={action.id}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
