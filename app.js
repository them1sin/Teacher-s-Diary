const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRouter = require("./routes/auth");
const addUser = require("./routes/users");
const deleteUser = require("./routes/users");
const getUsers = require("./routes/users");
const { get } = require('http');

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


app.use(express.static('view'));

app.use("/auth", authRouter);
app.use("/users", addUser);
app.use("/delete", deleteUser);
app.use("/get_users", getUsers);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'html/authorization_form.html'));
});

app.get('/teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'html/teacher_dashboard.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'html/student_dashboard.html'));
})

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'html/admin_panel.html'));
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});