const {ADMIN} = require("./constant/role")
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const {sendResponse} = require("./utils/responseUtil");
const {HTTP_STATUS} = require("./constant/httpStatusConstant");
const {defaultApiErrorhandler} = require("./middleware/authMiddleware");
const app = express();

require('dotenv').config()

const db = require('././config/database/connection')
app.use(session({
    store: new KnexSessionStore({
        knex: db,
        tablename: 'session_table',
    }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000
    },
}));

// view engine setup
app.use(helmet())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const {user} = req.session
    res.locals.APP_URL = process.env.APP_URL
    res.locals.path = req.path;
    if (user?.role === ADMIN) {
        res.locals.APP_URL = process.env.APP_URL + "admin/"
    }
    res.locals.user = user
    res.sendResponse = (data = null, status = HTTP_STATUS.OK, error = null) =>
        sendResponse(res, data, status, error)
    next()
})

app.use('/admin', require('./routes/admin/page'));
app.use('/admin/api', require('./routes/admin/api'));

// error handler
app.use(async (req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).render('admin/page/notFound')
});
app.use(async (err, req, res, next) => {
    defaultApiErrorhandler(err, req, res)
});

module.exports = app;
