let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let expressValidator = require('express-validator');
let i18n = require('i18n');
let logger = require('morgan');
let router = require('./app/routes');
let cors = require ('cors');
let massive = require('massive');
let config = require('config');

const corsOptions = {
    credentials: true,
    origin: true
};


//Set locale
i18n.configure({
    locales:['en', 'es'],
    directory: __dirname + '/locales',
    updateFiles: true
});

var app = express();

// database
// example postgres://user:password@host/database
massive(config.dbConnectionString).then(instance=>{
    global.database = instance;
});



// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(cors(corsOptions));

logger(':method :url :status :res[content-length] - :response-time ms')

app.use(logger('dev'));
app.use(i18n.init);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

//rutas
router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    /* res.render throws an error because we're not using a view engine
        returning a json with the error message, may change in the future
     */
    //res.render('error');
    console.error(err);
    res.json({
        message: err.message,
        error: err
    });
});






module.exports = app;
