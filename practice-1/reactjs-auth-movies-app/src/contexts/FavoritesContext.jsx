import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext";
import {
  addFavoriteMovie,
  getFavorites,
  removeFavoriteMovie,
} from "../services/favoritesApi";

const FavoritesContext = createContext();

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        favorites: action.favorites,
        loading: false,
        error: null,
      };

    case "ADD_FAVORITE": {
      if (
        state.favorites.some(
          (fav) => fav.movie.imdbID === action.favorite.movie.imdbID,
        )
      ) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
        error: null,
      };
    }

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.movie.imdbID !== action.imdbID,
        ),
        error: null,
      };

    case "CLEAR_FAVORITES":
      return initialState;

    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const { user, token } = useAuth();
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    let ignore = false;

    async function loadFavorites() {
      if (!user || !token) {
        dispatch({ type: "CLEAR_FAVORITES" });
        return;
      }

      dispatch({ type: "SET_LOADING", loading: true });

      try {
        const result = await getFavorites(token);

        if (!ignore) {
          dispatch({ type: "INITIALIZE", favorites: result.favorites });
        }
      } catch (error) {
        if (!ignore) {
          dispatch({
            type: "SET_ERROR",
            error: error.message || "Failed to load favorites",
          });
        }
      }
    }

    loadFavorites();

    return () => {
      ignore = true;
    };
  }, [user, token]);

  const addFavorite = async (movie) => {
    if (!token) return;

    try {
      const result = await addFavoriteMovie(token, movie);
      dispatch({ type: "ADD_FAVORITE", favorite: result.favorite });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error: error.message || "Failed to add favorite",
      });
    }
  };

  const removeFavorite = async (imdbID) => {
    if (!token) return;

    try {
      await removeFavoriteMovie(token, imdbID);
      dispatch({ type: "REMOVE_FAVORITE", imdbID });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error: error.message || "Failed to remove favorite",
      });
    }
  };

  const isFavorite = (imdbID) =>
    state.favorites.some((fav) => fav.movie.imdbID === imdbID);

  const favoriteIds = useMemo(
    () => new Set(state.favorites.map((fav) => fav.movie.imdbID)),
    [state.favorites],
  );

  const value = {
    favorites: state.favorites,
    loading: state.loading,
    error: state.error,
    favoriteIds,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
