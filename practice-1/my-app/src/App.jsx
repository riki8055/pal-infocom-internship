import "./App.css";

function App() {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Enter name</label>
        <input type="text" id="name" />
      </div>
      <div className="form-control">
        <label htmlFor="name">Enter email</label>
        <input type="email" id="email" />
      </div>
      <div className="form-control">
        <label htmlFor="password">Enter password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
