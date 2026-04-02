import { useState, useReducer } from "react";
import { validateSignup } from "../utils/validateSignup";
import { dashboardReducer, initialState } from "../components/dashboardReducer";
import styles from "./Signup.module.css";

function Signup() {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validateSignup(formData);
    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const userExists = users.find((user) => user.email === formData.email);

    if (userExists) {
      errors.email = "Email already exists";
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    const newUser = formData;

    // Save user to localStorage
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    console.log("User created:", newUser);
    dispatch({ type: "RESET" });
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Signup</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {state.errors.name && <p>{state.errors.name}</p>}

        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {state.errors.email && <p>{state.errors.email}</p>}

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {state.errors.password && <p>{state.errors.password}</p>}

        <button className={styles.button} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
