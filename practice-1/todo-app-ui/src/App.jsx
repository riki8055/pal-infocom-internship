import "./App.css";

import TodoForm from "./components/TodoForm";
import Button from "./UI/Button";
import DropDownBtns from "./components/DropDownBtns";
import Todos from "./components/Todos";

function App() {
  console.log("App rendered");

  return (
    <div className="container">
      <div class="card my-3">
        <div class="card-body">
          <TodoForm />
        </div>
        <Todos />
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
              <DropDownBtns />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
