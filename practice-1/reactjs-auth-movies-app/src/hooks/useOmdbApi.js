import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

function buildMoviesUrl({ query, page, type, year }) {
  const params = new URLSearchParams({
    q: query,
    page: page?.toString() || "1",
  });

  if (type) params.append("type", type);
  if (year) params.append("y", year);

  return `${API_BASE_URL}/movies/search?${params.toString()}`;
}

export function useOmdbApi({
  query = "",
  page = 1,
  type = "",
  year = "",
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(
    async ({
      query: searchQuery = query,
      page: searchPage = page,
      type: searchType = type,
      year: searchYear = year,
    } = {}) => {
      if (!searchQuery) {
        setData(null);
        setError(null);
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const url = buildMoviesUrl({
          query: searchQuery,
          page: searchPage,
          type: searchType,
          year: searchYear,
        });

        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch movies.");
        }

        if (!result.success) {
          throw new Error(result.error || "No results found.");
        }

        setData(result.data);
        return result.data;
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setData(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [page, query, type, year],
  );

  useEffect(() => {
    if (query) {
      fetchMovies({ query, page, type, year });
    }
  }, [fetchMovies, query, page, type, year]);

  return {
    data,
    loading,
    error,
    fetchMovies,
  };
}
