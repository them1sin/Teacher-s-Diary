const users = require('../../models/user/users');


exports.user_login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await users.findOne({ userName });
        if (user && user.password === password) {
            return res.json({
                success: true,
                role: user.role,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Неправильный логин или пароль",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера.",
        });
    }
};

