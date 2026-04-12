import { useCallback, useEffect, useState } from "react";

const OMDB_API_URL = "https://www.omdbapi.com/";

function buildOmdbUrl({ apiKey, query, page, type, year }) {
  const params = new URLSearchParams({
    apikey: apiKey,
    s: query,
    page: page?.toString() || "1",
  });

  if (type) params.append("type", type);
  if (year) params.append("y", year);

  return `${OMDB_API_URL}?${params.toString()}`;
}

export function useOmdbApi({
  query = "",
  page = 1,
  type = "",
  year = "",
  apiKey = import.meta.env.VITE_OMDB_API_KEY,
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

      if (!apiKey) {
        const missingKeyError =
          "OMDB API key is not configured. Set VITE_OMDB_API_KEY in your environment.";
        setError(missingKeyError);
        setData(null);
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const url = buildOmdbUrl({
          apiKey,
          query: searchQuery,
          page: searchPage,
          type: searchType,
          year: searchYear,
        });

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movies from OMDB API.");
        }

        const result = await response.json();
        if (result.Response === "False") {
          throw new Error(result.Error || "No results found.");
        }

        setData(result);
        return result;
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setData(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiKey, page, query, type, year],
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
