import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

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
        state.favorites.some((movie) => movie.imdbID === action.movie.imdbID)
      ) {
        return state;
      }
      return {
        favorites: [...state.favorites, action.movie],
      };
    }

    case "REMOVE_FAVORITE":
      return {
        favorites: state.favorites.filter(
          (movie) => movie.imdbID !== action.imdbID,
        ),
      };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
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
    dispatch({ type: "ADD_FAVORITE", movie });
  };

  const removeFavorite = (imdbID) => {
    dispatch({ type: "REMOVE_FAVORITE", imdbID });
  };

  const isFavorite = (imdbID) =>
    state.favorites.some((movie) => movie.imdbID === imdbID);

  const favoriteIds = useMemo(
    () => new Set(state.favorites.map((movie) => movie.imdbID)),
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
