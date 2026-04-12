import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

const initialState = {
  favorites: [],
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return {
        favorites: action.favorites,
      };

    case "ADD_FAVORITE": {
      if (
        state.favorites.some((fav) => fav.movie.imdbID === action.movie.imdbID)
      ) {
        return state;
      }
      return {
        favorites: [
          ...state.favorites,
          { movie: action.movie, user: action.user },
        ],
      };
    }

    case "REMOVE_FAVORITE":
      return {
        favorites: state.favorites.filter(
          (fav) => fav.movie.imdbID !== action.imdbID,
        ),
      };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(favoritesReducer, initialState, () => {
    const storedFavorites = localStorage.getItem("favoriteMovies");
    return storedFavorites
      ? { favorites: JSON.parse(storedFavorites) }
      : initialState;
  });

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(state.favorites));
  }, [state.favorites]);

  const addFavorite = (movie) => {
    dispatch({ type: "ADD_FAVORITE", movie, user });
  };

  const removeFavorite = (imdbID) => {
    dispatch({ type: "REMOVE_FAVORITE", imdbID });
  };

  const isFavorite = (imdbID) =>
    state.favorites.some((fav) => fav.movie.imdbID === imdbID);

  const favoriteIds = useMemo(
    () => new Set(state.favorites.map((fav) => fav.movie.imdbID)),
    [state.favorites],
  );

  const value = {
    favorites: state.favorites,
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
