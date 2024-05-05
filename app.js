const {ADMIN, DOSEN} = require("./constant/role")
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

const db = require('././config/database/sessionConnection')
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

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-eval'"], // Allows 'eval'
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    })
)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/templates', express.static(path.join(__dirname, 'templates')));

app.use((req, res, next) => {
    const {user} = req.session
    res.locals.BASE_URL = req.protocol + '://' + req.get('host') + "/"
    res.locals.path = req.path;

    switch (user?.role) {
        case ADMIN:
            res.locals.APP_URL = res.locals.BASE_URL + "admin/"
            break;
        case DOSEN:
            res.locals.APP_URL = res.locals.BASE_URL + "dosen/"
            break;
        default:
            res.locals.APP_URL = res.locals.BASE_URL
            break
    }

    res.locals.user = user
    res.sendResponse = (data = null, status = HTTP_STATUS.OK, error = null) =>
        sendResponse(res, data, status, error)
    next()
})

app.use('/dosen', require('./routes/dosen/page'));
app.use('/dosen/api', require('./routes/dosen/api'));

app.use('/admin', require('./routes/admin/page'));
app.use('/admin/api', require('./routes/admin/api'));

// error handler
app.use(async (req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).render('page/notFound')
});

app.use((err, req, res, next) => {
    defaultApiErrorhandler(err, req, res)
});

module.exports = app;
