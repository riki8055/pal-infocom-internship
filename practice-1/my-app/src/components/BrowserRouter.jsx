import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>Welcome to Home Page</h2>;
}

function About() {
  return <h2>This is About Page</h2>;
}

function Contact() {
  return <h2>This is Contact Page</h2>;
}

function MyBrowserRouter() {
  return (
    <BrowserRouter>
      <h1>My Website</h1>

      {/* Navigation Links */}
      <nav>
        <Link to="/">Home</Link> |<Link to="/about"> About</Link> |
        <Link to="/contact"> Contact</Link>
      </nav>

      <hr />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyBrowserRouter;
