import "./App.css";

import TodoForm from "./components/TodoForm";

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
            <button
              type="button"
              class="btn btn-secondary me-2"
              id="clearCompletedBtn"
            >
              Clear Completed
            </button>

            <button type="button" class="btn btn-danger me-2" id="clearAllBtn">
              Clear All
            </button>

            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More Actions
              </button>
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
