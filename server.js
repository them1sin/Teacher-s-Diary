const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

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