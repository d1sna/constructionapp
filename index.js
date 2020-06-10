const express = require('express'),
    mongoose = require('mongoose'),
    exphbs = require('express-handlebars'),
    mainRoute = require('./routes/main');

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require('express-validator');
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;


const app = express(),
    hbs = exphbs.create({
        defaultLayout: 'main',
        extname: 'hbs'
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan("dev"));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(mainRoute);
app.use(expressValidator());

const fileStoreOptions = {};

app.use(
    session({
        store: new FileStore(fileStoreOptions),
        key: "user_sid",
        secret: "anything here",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    })
);

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://d1sna:89636579208@cluster0-wuwpp.mongodb.net/constructionapp', {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });

        app.listen(PORT, () => {
            console.log('Server has been started...PORT:', PORT);
        });
    } catch (error) {
        console.log('Не удалось запустить. Ошибка: ', error.name);
    }
}

start();