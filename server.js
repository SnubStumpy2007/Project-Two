
const express = require('express');
const sequelize = require('./config/connection.js');
const mysql = require('mysql12');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = sequelize.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'blog_db'
  },
  console.log(`Connected to the blog_db database.`)
);

// Routes
app.use(routes);

// Connect to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Query database
db.query('SELECT * FROM userAccount', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
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

