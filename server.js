const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('./models/users')

const app = express();
const PORT = 8080;

const url = 'mongodb://127.0.0.1:27017/node-diary';

mongoose.connect(url)
    .then(() => console.log("Подключение к MongoDB успешно!"))
    .catch((error) => console.log("Ошибка подключения: ", error));


app.use(express.json());

app.use((req, res, next) => {
        console.log('Request received:', req.method, req.url);
        next(); 
});

//Users 

app.post("/login", async (req, res) => {
    console.log('Received body:', req.body);

    const { userName, password } = req.body;

    try {
        const user = await Users.findOne({ userName, password });
        console.log(user);
        
        if (user && user.password === password) {
            return res.json({
                success: true,
                role: user.role
            });
        } else {
            return res.json({ 
                success: false,
                message: "Неправильный логин или пароль" 
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Ошибка сервера."
         });
    }
});


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