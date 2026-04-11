import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { validateSignup } from "../utils/validateSignup";
import { moviesReducer, initialState } from "../components/moviesReducer";
import { createSuccessMessage } from "../utils/successMessage";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  const [successMessage, setSuccessMessage] = useState(null);
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

    // Set success message
    const successMsg = createSuccessMessage(
      `Account created successfully! Redirecting to login...`,
      3000,
    );
    setSuccessMessage(successMsg);

    // Reset form and reducer state
    dispatch({ type: "RESET" });
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    // Redirect to login after delay
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }

  function handleDismissSuccess() {
    setSuccessMessage(null);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Signup</h2>

      {successMessage && (
        <div className={styles.successMessage}>
          <span>{successMessage.message}</span>
          <button
            type="button"
            className={styles.dismissButton}
            onClick={handleDismissSuccess}
            aria-label="Close success message"
          >
            ×
          </button>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            className={`${styles.input} ${state.errors.name ? styles.inputError : ""}`}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {state.errors.name && (
            <span className={styles.fieldError}>{state.errors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            className={`${styles.input} ${state.errors.email ? styles.inputError : ""}`}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {state.errors.email && (
            <span className={styles.fieldError}>{state.errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            className={`${styles.input} ${state.errors.password ? styles.inputError : ""}`}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {state.errors.password && (
            <span className={styles.fieldError}>{state.errors.password}</span>
          )}
        </div>

        <button className={styles.button} type="submit">
          Signup
        </button>
      </form>

      <p className={styles.signupLink}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default Signup;
