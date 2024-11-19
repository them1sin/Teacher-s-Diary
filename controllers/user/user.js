const users = require('../../models/user/users');

exports.user_create = async (req, res) => {
    try {
        const {userName, password, role} = req.body;

        const newUser = new users({
            userName, password, role
        });

        await newUser.save();

        res.json({
            success: true,
            message: "Пользователь добавлен успешно!"
        });
    } catch (e) {
        console.log("Ошибка при добавлении пользователя:", e);
        res.status(500).json({
            succes: false,
            message: "Ошибка при добавлении пользователя:"
        });
    }
}


exports.user_delete = async(req, res) => {
    
    try {
        const ID = req.body.id;
        const role = req.body.role;

        await users.deleteOne({_id : ID});

        res.json({
            success: true,
            message: "Пользователь удален!"
        });

    } catch (e) {
        console.log("Ошибка при удалении пользователя!");
        res.status(500).json({
            success: false,
            message: "Ошибка при удалении пользователя!"
        });
    }
}

exports.user_list = async(req, res) => {
    try {
        const userList = await users.find({}, '_id userName password role');

        res.json({
            success: true,
            data: userList
        });

    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Ошибка при выводе пользователей!"
        });
    }
}