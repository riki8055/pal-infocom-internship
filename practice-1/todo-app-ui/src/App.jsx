import "./App.css";

import TodoForm from "./components/TodoForm";
import Button from "./UI/Button";

function App() {
  console.log("App rendered");

  return (
    <div className="container">
      <div class="card my-3">
        <div class="card-body">
          <TodoForm />
        </div>
        <ul class="list-group list-group-flush" id="todoList"></ul>
        <div class="card-body">
          <div class="info"></div>
          <div class="btns d-flex">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              id="clearCompletedBtn"
            >
              Clear Completed
            </Button>

            <Button
              type="button"
              className="me-2"
              variant="danger"
              id="clearAllBtn"
            >
              Clear All
            </Button>

            <div class="dropdown">
              <Button
                type="button"
                className="dropdown-toggle"
                variant="secondary"
                id="clearCompletedBtn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More Actions
              </Button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li>
                  <button
                    class="dropdown-item btn"
                    href="#"
                    id="removePriorityBtn"
                  >
                    Remove ToDo at priority
                  </button>
                </li>
                <li>
                  <button class="dropdown-item btn" href="#" id="popOutBtn">
                    Pop out last ToDo
                  </button>
                </li>
                <li>
                  <button class="dropdown-item btn" href="#" id="clearRangeBtn">
                    Delete ToDo in a range
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
