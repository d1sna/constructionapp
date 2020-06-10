const {
    Router
} = require('express'),
    router = Router(),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({
        extended: false
    });


const Object = require('../models/object'),
    Logins = require('../models/login');

const bcrypt = require('bcrypt');


//Main page

router.get('/', (req, res) => {

    res.render('index', {
        title: 'Главная страница',
        isMainPage: true,
    });
}).post(urlencodedParser, async (req, res) => {
    let login = req.body.login,
        password = req.body.password;
    let result = await Logins.find({
        login
    });

    if (result.length) {
        let checkPassword = await bcrypt.compare(password, result[0].password);
        if (checkPassword) {
            res.setHeader('Set-Cookie', 'Test-Header=HeaderValue');
            res.render('index', {
                loginText: `Вы успешно вошли, как ${result[0].fullname}`,
                title: 'Главная страница',
                isMainPage: true,
                buttonText: 'Выйти'
            });
        } else {
            res.render('index', {
                loginText: ' такого пользователя не существует или неправильный пароль ;(',
                title: 'Главная страница',
                isMainPage: true,
                buttonText: 'Назад'
            });
        }
    }
});

//Create page

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

//Show page

router.get('/show', async (req, res) => {
    let data = await Object.find().lean();

    res.render('show', {
        title: 'Показать отчеты',
        isShowPage: true,
        data: data
    });

});

//Registration page

router.get('/registration', async (req, res) => {
    res.render('registration', {
        title: 'Регистрация'
    });
});

router.post('/registration', urlencodedParser, async (req, res) => {
    let password = req.body.password,
        passwordCheck = req.body.passwordCheck;

    let hashedPassword = await bcrypt.hash(password, 10);

    let dataLogin = new Logins({
        fullname: req.body.fullname,
        employeRank: req.body.employeRank,
        organisation: req.body.organisation,
        login: req.body.login,
        password: hashedPassword,

    });

    let checkLogin = await Logins.find({
        login: dataLogin.login
    });
    // console.log(checkLogin.length);

    if (checkLogin.length) {
        res.render('registration', {
            title: 'Регистрация',
            text: `Извините, такой пользователь уже зарегестрирован`
        });

    } else if (password !== passwordCheck) {
        res.render('registration', {
            title: 'Регистрация',
            text: `Извините, пароли не совпадают`
        });
    } else {
        await dataLogin.save((err) => {
            if (err) {
                console.log('Data has not been saved, error:', err.name);
            } else {
                console.log('Data has been saved successfuly');
            }
        });
        console.log('Data has been sent');
        res.render('index', {
            loginText: `Вы успешно зарегестрированы, как ${dataLogin.fullname} !`,
            buttonText: 'Войти'
        });
    }


});

//Personal cabinet

router.get('/lk', async (req, res) => {
    let dataReports = await Logins.find({
        madeReport: ''
    });
    console.log(dataReports);
    res.render('lk', {
        title: 'Личный кабинет',
        madeReport: dataReports.length,
        isLk: true
    });
});

module.exports = router;