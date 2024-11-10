const User = require('../../models/users')

$(document).ready(function() {
    const correctLogin = User.find({username});
    const correctPassword = User.find({password});

    console.log(correctLogin);

    $('.firstBtn').click(function() {
        let login = $('input[name="auth_login"]').val();
        let pass = $('input[name="auth_pass"]').val();

        if (login === correctLogin && pass === correctPassword) {
            window.location.assign('/main');
        } else {
            alert("Неправильный логин или пароль. Попробуйте еще раз!")
        }
    })
}
)