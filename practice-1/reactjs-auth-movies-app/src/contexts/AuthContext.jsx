import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
  errors: {},
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
        errors: {},
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        errors: {},
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "CLEAR_ALL_ERRORS":
      return {
        ...state,
        errors: {},
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "RESET":
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is logged in on app start
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "LOGIN", payload: currentUser });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "LOGOUT" });
  };

  const setErrors = (errors) => {
    dispatch({ type: "SET_ERRORS", payload: errors });
  };

  const clearError = (field) => {
    dispatch({ type: "CLEAR_ERROR", field });
  };

  const clearAllErrors = () => {
    dispatch({ type: "CLEAR_ALL_ERRORS" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const value = {
    user: state.user,
    loading: state.loading,
    errors: state.errors,
    login,
    logout,
    setErrors,
    clearError,
    clearAllErrors,
    reset,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
