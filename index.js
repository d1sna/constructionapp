const express = require('express'),
    mongoose = require('mongoose'),
    exphbs = require('express-handlebars'),
    mainRoute = require('./routes/main');


const PORT = process.env.PORT || 3000;

const app = express(),
    hbs = exphbs.create({
        defaultLayout: 'main',
        extname: 'hbs'
    });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(mainRoute);

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://d1sna:89636579208@cluster0-wuwpp.mongodb.net/objects', {
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