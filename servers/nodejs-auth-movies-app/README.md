# NodeJS Auth Movies App Server

Backend server for the ReactJS Authentication Movies App. Built with Express.js, featuring user authentication, OMDB movie search, and favorite management with JSON file persistence.

---

## 🚀 Features

- ✅ **User Authentication** - Signup/Login with JWT tokens
- ✅ **OMDB API Proxy** - Search movies (API key hidden from frontend)
- ✅ **Favorites Management** - Add, remove, and list favorite movies
- ✅ **JSON File Storage** - All data persisted in JSON files (no database needed)
- ✅ **Protected Routes** - Auth middleware to secure favorites endpoints
- ✅ **Rate Limiting** - 100 requests per 15 minutes to prevent abuse
- ✅ **Input Validation** - Email, password, and movie data validation
- ✅ **Error Handling** - Centralized error handler with consistent response format
- ✅ **CORS** - Configured for frontend communication

---

## 📦 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **axios** - HTTP client for OMDB API
- **uuid** - Unique ID generation

---

## 🛠️ Setup Instructions

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Configure Environment Variables**

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production

# OMDB API (Get free key at https://www.omdbapi.com/apikey.aspx)
OMDB_API_KEY=your_omdb_api_key_here
OMDB_API_URL=https://www.omdbapi.com/
```

**Note:** Get a free OMDB API key at https://www.omdbapi.com/apikey.aspx

### 3. **Start the Server**

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will run on `http://localhost:5000`

---

## 📡 API Endpoints

### **Health Check**

- **GET** `/health` - Server status
  ```bash
  curl http://localhost:5000/health
  ```

---

### **Authentication Routes** (`/auth`)

#### **Signup**

- **POST** `/auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Errors:**
  - `400` - Validation failed (invalid email, weak password, etc.)
  - `409` - Email already registered

#### **Login**

- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Errors:**
  - `400` - Validation failed
  - `401` - Invalid email or password

---

### **Movies Routes** (`/movies`)

#### **Search Movies**

- **GET** `/movies/search?q=<query>&page=1&type=movie&y=2010`
- **Query Parameters:**
  - `q` (required) - Search query
  - `page` (optional) - Page number (default: 1)
  - `type` (optional) - Type filter (movie, series, episode)
  - `y` (optional) - Year filter
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "Search": [...],
      "totalResults": "100",
      "Response": "True"
    }
  }
  ```
- **Errors:**
  - `400` - Missing search query
  - `404` - No movies found
  - `500` - OMDB API key not configured

**Example:**

```bash
curl "http://localhost:5000/movies/search?q=Inception&type=movie"
```

---

### **Favorites Routes** (`/favorites`) - Protected 🔒

All favorites routes require authentication. Include JWT token in Authorization header:

```
Authorization: Bearer <token>
```

#### **Get User's Favorites**

- **GET** `/favorites`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Favorites retrieved successfully",
    "favorites": [
      {
        "id": "uuid",
        "userId": "uuid",
        "email": "john@example.com",
        "movie": {
          "imdbID": "tt1375666",
          "Title": "Inception",
          "Year": "2010",
          "Type": "movie",
          "Poster": "https://..."
        },
        "addedAt": "2026-05-09T12:00:00.000Z"
      }
    ],
    "count": 1
  }
  ```

#### **Add Movie to Favorites**

- **POST** `/favorites`
- **Body:**
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
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "Movie added to favorites successfully",
    "favorite": { ... }
  }
  ```
- **Errors:**
  - `400` - Missing movie data
  - `409` - Movie already in favorites
  - `401` - Unauthorized (missing/invalid token)

#### **Remove Movie from Favorites**

- **DELETE** `/favorites/:imdbID`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Movie removed from favorites successfully",
    "removedFavorite": { ... }
  }
  ```
- **Errors:**
  - `404` - Favorite not found
  - `401` - Unauthorized

---

## 🧪 Testing Endpoints

### **Using cURL**

**1. Signup:**

```bash
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**2. Login:**

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**3. Search Movies:**

```bash
curl "http://localhost:5000/movies/search?q=Inception"
```

**4. Get Favorites (with token):**

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
curl -X GET http://localhost:5000/favorites \
  -H "Authorization: Bearer $TOKEN"
```

**5. Add Favorite:**

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
curl -X POST http://localhost:5000/favorites \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"movie":{"imdbID":"tt1375666","Title":"Inception","Year":"2010","Type":"movie","Poster":"https://..."}}'
```

**6. Delete Favorite:**

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
curl -X DELETE http://localhost:5000/favorites/tt1375666 \
  -H "Authorization: Bearer $TOKEN"
```

### **Using Postman**

1. Import the API endpoints as shown above
2. For protected routes, add to **Headers** tab:
   - Key: `Authorization`
   - Value: `Bearer <your_jwt_token>`

---

## 📁 Project Structure

```
servers/nodejs-auth-movies-app/
├── index.js                          # Server entry point
├── package.json                      # Dependencies
├── .env                              # Environment variables (git-ignored)
├── .gitignore                        # Git ignore rules
├── data/
│   ├── users.json                    # User data (auto-created)
│   └── favorites.json                # Favorites data (auto-created)
├── middleware/
│   ├── authMiddleware.js             # JWT verification
│   ├── errorHandler.js               # Global error handling
│   └── rateLimiter.js                # Rate limiting (100 req/15min)
├── routes/
│   ├── auth.js                       # Authentication endpoints
│   ├── movies.js                     # Movies search endpoint
│   └── favorites.js                  # Favorites CRUD endpoints
├── utils/
│   ├── jwtManager.js                 # JWT sign/verify
│   ├── passwordManager.js            # Password hashing/comparison
│   ├── jsonFileManager.js            # JSON file operations
│   └── validators.js                 # Input validation
└── README.md                         # This file
```

---

## 🔐 Security Features

### **Password Security**

- Passwords hashed with bcrypt (10 salt rounds)
- Passwords never returned in API responses
- Minimum 6 characters required

### **JWT Tokens**

- Tokens expire after 7 days
- Contains userId, email, and name
- Verified on every protected route request
- Secret key must be changed in production

### **Rate Limiting**

- 100 requests per 15 minutes per IP/user
- Returns 429 status code when exceeded
- Includes `X-RateLimit-*` headers for tracking

### **CORS**

- Only allows requests from configured `CLIENT_URL`
- Credentials enabled for cookie/auth support

### **Input Validation**

- Email format validation
- Password strength validation
- Name length validation
- Movie data structure validation

---

## 📊 Data Storage

### **User Schema** (users.json)

```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$...", // bcrypt hash
  "createdAt": "2026-05-09T12:00:00.000Z"
}
```

### **Favorite Schema** (favorites.json)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "email": "john@example.com",
  "movie": {
    "imdbID": "tt1375666",
    "Title": "Inception",
    "Year": "2010",
    "Type": "movie",
    "Poster": "https://..."
  },
  "addedAt": "2026-05-09T12:00:00.000Z"
}
```

---

## ⚠️ Known Limitations

1. **In-Memory Rate Limiting** - Resets on server restart. For production, use Redis.
2. **JSON File Storage** - Not suitable for large-scale applications. For production, use a database (MongoDB, PostgreSQL, etc.).
3. **Single Server** - JWT secrets and rate limits not shared across multiple server instances.
4. **No Email Verification** - Signup doesn't verify email addresses.
5. **No Password Reset** - No mechanism to reset forgotten passwords.

---

## 🚀 Production Deployment

Before deploying to production:

1. **Change JWT Secret** - Set a strong random value in `.env`
2. **Enable HTTPS** - Use environment variable for secure cookies
3. **Use Database** - Replace JSON files with proper database
4. **Setup Rate Limiting** - Use Redis-based rate limiter
5. **Email Verification** - Add email confirmation for signups
6. **Logging** - Setup centralized logging (e.g., Winston, Morgan)
7. **Environment Validation** - Ensure all required `.env` variables are set

---

## 📝 Example Workflow

1. **User signs up:**

   ```bash
   POST /auth/signup
   Response: JWT token + user data
   ```

2. **User logs in:**

   ```bash
   POST /auth/login
   Response: JWT token + user data
   ```

3. **User searches movies:**

   ```bash
   GET /movies/search?q=Inception
   Response: Movie search results from OMDB
   ```

4. **User adds favorite:**

   ```bash
   POST /favorites (with token)
   Response: Added favorite confirmation
   ```

5. **User views favorites:**
   ```bash
   GET /favorites (with token)
   Response: List of user's favorite movies
   ```

---

## 🤝 Frontend Integration

The React app should:

1. **Store token** after login/signup in `localStorage`
2. **Include token** in Authorization header for protected requests
3. **Handle 401** responses by redirecting to login
4. **Handle 429** responses by informing user to try later
5. **Use OMDB endpoint** via this server (not directly)

---

## 📚 References

- [Express.js Documentation](https://expressjs.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [OMDB API](https://www.omdbapi.com/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

---

## 📞 Support

For issues or questions:

1. Check error messages in server logs
2. Verify `.env` configuration
3. Ensure frontend is sending correct request format
4. Check OMDB API key is valid

---

**Version:** 1.0.0  
**Last Updated:** May 10, 2026
