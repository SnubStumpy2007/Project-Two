// const dotenv = require('dotenv').config(); // Corrected import
const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const exhdbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const routes = require('./controllers');

const exploreRoute = require('./controllers/api/explore');

const app = express();
const PORT = process.env.PORT || 3001;

const handle = exhdbs.create({ helpers })


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

// View engine setup
console.log("Setting up Handlebars engine...");
app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(cors({ origin: 'http://localhost:5500' }));
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', exploreRoute);



app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
