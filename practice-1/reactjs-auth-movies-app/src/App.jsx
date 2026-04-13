import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function AppRoutes() {
  const { dispatch } = useAuth();

  const resetAuthErrors = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <BrowserRouter>
      <Navbar onAuthReset={resetAuthErrors} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
