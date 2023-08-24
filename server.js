// Import required Node.js modules and libraries
const path = require('path');                 // For working with file paths
const express = require('express');           // Express.js web application framework
const session = require('express-session');   // Middleware for session management
const cors = require('cors');                 // Middleware for handling Cross-Origin Resource Sharing (CORS)
const { engine } = require('express-handlebars');  // Template engine for rendering HTML views
const SequelizeStore = require('connect-session-sequelize')(session.Store);  // Session store for Sequelize

// Create an instance of the Express application
const app = express();

// Define the port number to use, using the environment variable PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Import routes and Sequelize database connection
const routes = require('./routes');            // Your application's custom routes
const sequelize = require('./config/connection');  // Sequelize database connection
const exploreRoute = require('./routes/explore');  // Custom route for exploring

// Configuration for managing user sessions using express-session
const sess = {
    secret: process.env.SESSION_SECRET || 'Super secret secret',  // Secret key for session encryption
    cookie: {
        maxAge: 7200000,                // Maximum session lifetime in milliseconds (2 hours)
        httpOnly: true,                 // HTTP-only cookies for added security
        secure: process.env.NODE_ENV === "production",  // Cookies are secure in production mode
        sameSite: 'strict',             // Restrict cookies to same-site requests
    },
    resave: false,                      // Don't resave unchanged sessions
    saveUninitialized: true,            // Save uninitialized sessions
    store: new SequelizeStore({
        db: sequelize                   // Store sessions in your Sequelize-powered database
    })
};
//test
// Configure the view engine for rendering HTML templates
console.log("Setting up Handlebars engine...");
app.engine('.handlebars', engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(session(sess));                  // Enable session management
app.use(express.json());                 // Parse incoming JSON data
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the 'public' directory
app.use('/', exploreRoute);              // Use a custom route for exploring

// Route setup - use your custom routes defined in the 'routes' module
app.use(routes);

// Sync the Sequelize models with the database and start the Express server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
