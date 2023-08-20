const dotenv = require('dotenv').config(); // Corrected import
const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const {engine} = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const routes = require('./routes');
const sequelize = require('./config/connection');
const exploreRoute = require('./routes/explore');

const app = express();
const PORT = process.env.PORT || 3001;

// View engine setup
console.log("Setting up Handlebars engine...");
app.engine('.handlebars', engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', '.handlebars');
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
app.use('/', exploreRoute);



// Route setup
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
