$(document).ready(function() {
    const correctLogin = 'admin';
    const correctPassword = '1111';

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