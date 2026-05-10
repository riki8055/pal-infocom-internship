import { API_BASE_URL } from "../config/api";

function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse(response) {
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update favorites");
  }

  return result;
}

export async function getFavorites(token) {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    headers: getAuthHeaders(token),
  });

  return parseResponse(response);
}

export async function addFavoriteMovie(token, movie) {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ movie }),
  });

  return parseResponse(response);
}

export async function removeFavoriteMovie(token, imdbID) {
  const response = await fetch(`${API_BASE_URL}/favorites/${imdbID}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  return parseResponse(response);
}
