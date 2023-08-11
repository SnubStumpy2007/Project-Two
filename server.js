const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { User } = require('./models'); 
const userRoutes = require('./routes/users'); 

const app = express();

// Middleware for session management
app.use(session({
  secret: 'your-secret-key', // It's better to use an environment variable for this
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
    maxAge: 7200000 // 2 hours
  }
}));

// Middleware to parse JSON payloads
app.use(express.json());

// Middleware to parse x-www-form-urlencoded payloads (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS, JS, images) if needed
// app.use(express.static('public'));

// Use the routes from routes/users.js
app.use('/users', userRoutes);

// Assuming you may want a homepage route
app.get('/', (req, res) => {
  res.send('Welcome to Personal Blog Platform!'); 
  // Consider rendering a template or serving a static HTML file here
});

// other routes or middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
