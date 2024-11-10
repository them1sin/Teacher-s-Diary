const User = require('../models/User');

const user = new User({
    userName: "Artyom",
    paswword: "1111",
    role: "Teacher"
});

exports.createUser = async (req, res) => {
    try {
        const user = new User({
            userName: req.body.userName,
            paswword: req.body.password,
            role: req.body.role
        });
        
        await user.save();
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({error: "Ошибка при создании пользователя!"});
    }
};

