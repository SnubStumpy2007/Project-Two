// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Define session configuration
const sess = {
  secret: 'Super secret secret', // Secret used to sign the session ID cookie
  cookie: {
    maxAge: 300000, // Session duration in milliseconds
    httpOnly: true, // Restrict cookie access to HTTP(S)
    secure: false, // Allow cookie over non-HTTPS connections (should be true in production)
    sameSite: 'strict', // Restrict cookies to same-site requests
  },
  resave: false, // Do not resave unchanged sessions
  saveUninitialized: true, // Save uninitialized sessions (new and not modified)
  store: new SequelizeStore({
    db: sequelize // Use Sequelize to store sessions in the database
  })
};

// Use the session middleware with the defined configuration
app.use(session(sess));

// Configure Express to use Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Use the routes defined in the 'controllers' module
app.use(routes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening')); // Start the server on the specified port
});
