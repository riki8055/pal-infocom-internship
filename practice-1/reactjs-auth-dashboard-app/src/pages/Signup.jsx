import { useState } from "react";
import styles from "./Signup.module.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Signup</h2>

      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          value={formData.name}
        />

        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={formData.email}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={formData.password}
        />

        <button className={styles.button} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
