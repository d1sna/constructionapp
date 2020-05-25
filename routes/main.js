const {
    Router
} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная страница',
        isMainPage: true
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Создание отчета',
        isCreatePage: true
    });
});

module.exports = router;