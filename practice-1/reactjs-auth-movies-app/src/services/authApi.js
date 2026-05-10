import { API_BASE_URL } from "../config/api";

export async function signupUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    const error = new Error(result.message || "Failed to create account");
    error.errors = result.errors;
    throw error;
  }

  return result;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    const error = new Error(result.message || "Failed to log in");
    error.errors = result.errors;
    throw error;
  }

  return result;
}
