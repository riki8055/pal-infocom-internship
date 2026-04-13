import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { login, errors, setErrors, clearError, clearAllErrors } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      clearError(name);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (!user) {
      setErrors({ general: "Invalid email or password" });
      return;
    }

    // ✅ Create session using AuthContext
    login({
      name: user.name,
      email: user.email,
    });

    console.log("Login successful:", user);

    // Reset form and errors
    setFormData({ email: "", password: "" });
    clearAllErrors();

    // Redirect to dashboard
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>

      {errors.general && (
        <div className={styles.errorMessage}>{errors.general}</div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className={styles.fieldError}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className={styles.fieldError}>{errors.password}</span>
          )}
        </div>

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>

      <p className={styles.signupLink}>
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

export default Login;
