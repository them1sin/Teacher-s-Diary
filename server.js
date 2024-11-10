const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('models/users')

const app = express();
const PORT = 8080;

const url = 'mongodb://127.0.0.1:27017/node-diary';

mongoose.connect(url)
    .then(() => console.log("Подключение к MongoDB успешно!"))
    .catch((error) => console.log("Ошибка подключения: ", error));


//Users 


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html/index.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html/main.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});