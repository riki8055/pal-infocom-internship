# ReactJS Auth Movies App Client

Frontend client for the NodeJS Authentication Movies App server. Built with React and Vite, featuring server-backed authentication, movie search through the backend OMDB proxy, JWT session persistence, and protected favorite movie management.

---

## Features

- **Server-backed Authentication** - Signup and login through backend auth routes
- **JWT Session Persistence** - Keeps users logged in until the server token expires
- **Movie Search** - Searches movies through the backend `/movies/search` route
- **Favorites Management** - Add, remove, and view favorites using protected server routes
- **Protected UI States** - Favorites are only available to authenticated users
- **React Context State** - Auth and favorites managed with context/reducer patterns
- **Responsive Pages** - Home, Movies, Favorites, Signup, and Login pages
- **Environment-based API URL** - Backend URL configured with `VITE_API_BASE_URL`

---

## Tech Stack

- **React** - UI library
- **Vite** - Development server and build tool
- **React Router DOM** - Client-side routing
- **Swiper** - Carousel/slider UI
- **CSS Modules** - Page and component scoped styling
- **Fetch API** - Server communication

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the client root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

The backend server should be running from:

```text
servers/nodejs-auth-movies-app
```

By default, the server runs on:

```text
http://localhost:5000
```

### 3. Start the Client

Development mode:

```bash
npm run dev
```

The client will usually run on:

```text
http://localhost:5173
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## Available Scripts

### `npm run dev`

Starts the Vite development server.

### `npm run build`

Creates a production build in the `dist/` folder.

### `npm run preview`

Serves the production build locally for preview.

### `npm run lint`

Runs ESLint checks across the project.

---

## App Routes

### Home

- **Route:** `/`
- Shows the home dashboard and entry points into the movie experience.

### Movies

- **Route:** `/movies`
- Lets users search for movies.
- Uses the server route:

```http
GET /movies/search?q=<query>
```

- Logged-in users can add/remove movies from favorites.

### Favorites

- **Route:** `/favorites`
- Shows the logged-in user's saved movies.
- Uses protected server routes:

```http
GET /favorites
POST /favorites
DELETE /favorites/:imdbID
```

### Signup

- **Route:** `/signup`
- Registers a user through:

```http
POST /auth/signup
```

### Login

- **Route:** `/login`
- Logs a user in through:

```http
POST /auth/login
```

---

## Server Integration

The client communicates with the backend using `VITE_API_BASE_URL`.

### Authentication

Signup request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Login response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Auth Session

After login, the client stores:

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token"
}
```

The session is saved in `localStorage` under:

```text
authSession
```

On app start, the client checks whether the JWT is expired. If it is expired, the saved session is removed and the user is logged out.

### Protected Favorites Requests

Favorites requests include the JWT token:

```http
Authorization: Bearer <token>
```

Add favorite request:

```json
{
  "movie": {
    "imdbID": "tt1375666",
    "Title": "Inception",
    "Year": "2010",
    "Type": "movie",
    "Poster": "https://..."
  }
}
```

---

## Project Structure

```text
practice-1/reactjs-auth-movies-app/
|-- index.html
|-- package.json
|-- vite.config.js
|-- .env
|-- .env.example
|-- public/
|-- src/
|   |-- main.jsx
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   |-- assets/
|   |   |-- hero.png
|   |   |-- react.svg
|   |   `-- vite.svg
|   |-- components/
|   |   |-- Navbar.jsx
|   |   |-- Navbar.module.css
|   |   `-- Swiper.jsx
|   |-- config/
|   |   `-- api.js
|   |-- contexts/
|   |   |-- AuthContext.jsx
|   |   `-- FavoritesContext.jsx
|   |-- hooks/
|   |   `-- useOmdbApi.js
|   |-- pages/
|   |   |-- Home.jsx
|   |   |-- Home.module.css
|   |   |-- Movies.jsx
|   |   |-- Movies.module.css
|   |   |-- Favorites.jsx
|   |   |-- Favorites.module.css
|   |   |-- Signup.jsx
|   |   |-- Signup.module.css
|   |   |-- Login.jsx
|   |   `-- Login.module.css
|   |-- services/
|   |   |-- authApi.js
|   |   `-- favoritesApi.js
|   `-- utils/
|       |-- authSession.js
|       |-- successMessage.js
|       `-- validateSignup.js
`-- README.md
```

---

## Key Files

### `src/config/api.js`

Stores the backend API base URL:

```js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
```

### `src/services/authApi.js`

Handles:

- `signupUser()`
- `loginUser()`

### `src/services/favoritesApi.js`

Handles:

- `getFavorites()`
- `addFavoriteMovie()`
- `removeFavoriteMovie()`

### `src/hooks/useOmdbApi.js`

Searches movies through the backend movies route instead of calling OMDB directly from the browser.

### `src/contexts/AuthContext.jsx`

Stores and exposes:

- `user`
- `token`
- `login()`
- `logout()`
- form errors
- auth loading state

### `src/contexts/FavoritesContext.jsx`

Stores and exposes:

- `favorites`
- `favoriteIds`
- `addFavorite()`
- `removeFavorite()`
- favorites loading/error state

---

## Example Workflow

1. User signs up from `/signup`.

```http
POST /auth/signup
```

2. User logs in from `/login`.

```http
POST /auth/login
```

3. Client stores the returned `{ user, token }` session.

```text
localStorage.authSession
```

4. User searches movies from `/movies`.

```http
GET /movies/search?q=Inception
```

5. User adds a movie to favorites.

```http
POST /favorites
Authorization: Bearer <token>
```

6. User views favorites from `/favorites`.

```http
GET /favorites
Authorization: Bearer <token>
```

7. User logs out.

```text
Client removes authSession from localStorage.
```

---

## Session Behavior

The server controls how long a login session lasts through:

```env
JWT_EXPIRES_IN=7d
```

The client reads the JWT expiry from the token payload. If the token is expired when the app opens, the saved session is cleared automatically.

For production, an httpOnly secure cookie with refresh-token rotation is safer than storing JWTs in `localStorage`.

---

## Known Limitations

1. **JWT Stored in localStorage** - Simple for learning, but not ideal for production security.
2. **No Refresh Token Flow** - Users must log in again after the JWT expires.
3. **No Protected Route Redirect Component** - The Favorites page shows a login message instead of redirecting automatically.
4. **No Optimistic Rollback UI** - Favorite add/remove actions wait for server responses.
5. **Current Lint Issues Exist** - Some existing ESLint rules still fail around Fast Refresh exports and one Movies effect.

---

## Troubleshooting

### Client cannot connect to server

Check:

- Server is running on `http://localhost:5000`
- Client `.env` has `VITE_API_BASE_URL=http://localhost:5000`
- Server `.env` has `CLIENT_URL=http://localhost:5173`
- Browser console does not show CORS errors

### Movie search fails

Check:

- Server has a valid `OMDB_API_KEY`
- Server is running
- Request is going to `/movies/search`, not directly to OMDB

### Favorites fail with unauthorized error

Check:

- User is logged in
- `localStorage.authSession` contains a token
- Token has not expired
- Favorites request includes `Authorization: Bearer <token>`

---

## References

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [OMDB API](https://www.omdbapi.com/)

---

**Version:** 1.0.0  
**Last Updated:** May 10, 2026
