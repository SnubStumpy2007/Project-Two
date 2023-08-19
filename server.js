const dotenv = require('dotenv').config(); // Corrected import
const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//console.log('dotenv loaded:', dotenv); // Check if dotenv is loaded
//console.log('express loaded:', express); // Check if express is loaded
console.log('handlebars loaded:', exphbs)

const routes = require('./routes');
const sequelize = require('./config/connection');
//console.log('routes loaded:', routes)

const app = express();
const PORT = process.env.PORT || 3001;

console.log("Setting up Handlebars engine...");
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const sess = {
    secret: process.env.SESSION_SECRET || 'Super secret secret',
    cookie: {
        maxAge: 7200000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Middleware setup
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Route setup
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
