const {
    Router
} = require('express'),
    router = Router(),
    // mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    }),
    Object = require('../models/object');

// mongoose.connect(
//     'mongodb+srv://d1sna:89636579208@cluster0-wuwpp.mongodb.net/objects', {
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная страница',
        isMainPage: true,
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Создание отчета',
        isCreatePage: true,
    });
});

router.post('/create', urlencodedParser, async (req, res) => {
    let data = new Object({
        objectname: req.body.objectname,
        location: req.body.location,
        deffects: req.body.deffects,
        photo: req.body.photo,
        result: req.body.result
    });
    await data.save((err) => {
        if (err) {
            console.log('Data has not been saved, error:', err.name);
        } else {
            console.log('Data has been saved successfuly');
        }
    });
    console.log('Data has been sent');
    res.redirect('/');

});

router.get('/show', async (req, res) => {
    let data = await Object.find().lean();

    res.render('show', {
        title: 'Показать отчеты',
        isShowPage: true,
        data: data
    });

});

module.exports = router;