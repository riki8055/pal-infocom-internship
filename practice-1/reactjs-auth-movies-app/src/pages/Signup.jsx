import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signupUser } from "../services/authApi";
import { validateSignup } from "../utils/validateSignup";
import { createSuccessMessage } from "../utils/successMessage";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const { errors, setErrors, clearError, clearAllErrors, reset } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (errors[name]) {
      clearError(name);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validateSignup(formData);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signupUser(formData);
      console.log("User registered:", result.user);

      const successMsg = createSuccessMessage(
        `${result.message}. Redirecting to login...`,
        3000,
      );
      setSuccessMessage(successMsg);

      clearAllErrors();
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrors(error.errors || { general: error.message });
    } finally {
      setIsSubmitting(false);
    }
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

      {errors.general && (
        <div className={styles.errorMessage}>{errors.general}</div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className={styles.fieldError}>{errors.name}</span>
          )}
        </div>

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
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
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

        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Signup"}
        </button>
      </form>

      <p className={styles.signupLink}>
        Already have an account?{' '}
        <Link to="/login" onClick={reset} className={styles.link}>
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Signup;
