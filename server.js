require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

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
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Route setup
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
