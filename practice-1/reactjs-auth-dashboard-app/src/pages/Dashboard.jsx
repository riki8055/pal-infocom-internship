import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.welcomeText}>
              Welcome, <strong>{user.name}</strong>
            </span>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.cardTitle}>Welcome to your Dashboard!</h2>
          <p className={styles.cardText}>
            You have successfully logged in. This is your personal dashboard
            where you can manage your account and access various features.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Profile</h3>
            <p className={styles.statValue}>{user.name}</p>
            <p className={styles.statLabel}>Name</p>
          </div>

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Email</h3>
            <p className={styles.statValue}>{user.email}</p>
            <p className={styles.statLabel}>Account Email</p>
          </div>

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Status</h3>
            <p className={styles.statValue}>Active</p>
            <p className={styles.statLabel}>Account Status</p>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h3 className={styles.sectionTitle}>Quick Actions</h3>
          <div className={styles.actionsGrid}>
            <button className={styles.actionButton}>
              <span className={styles.actionIcon}>👤</span>
              <span>Edit Profile</span>
            </button>
            <button className={styles.actionButton}>
              <span className={styles.actionIcon}>🔒</span>
              <span>Change Password</span>
            </button>
            <button className={styles.actionButton}>
              <span className={styles.actionIcon}>📊</span>
              <span>View Analytics</span>
            </button>
            <button className={styles.actionButton}>
              <span className={styles.actionIcon}>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
