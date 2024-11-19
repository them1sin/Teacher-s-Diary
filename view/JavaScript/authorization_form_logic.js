$(document).ready(function() {

    $('.auth_button').click(function() {
        let Login = $('input[name="auth_login"]').val();
        let Password = $('input[name="auth_pass"]').val();


        $.ajax({
            url: "auth/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                userName: Login,
                password: Password,
            }),
            success: function(response) {    
            console.log("response from server:", response);
                if (response.role && response.role === "Teacher") {
                    window.location.assign('/teacher');
                } else if (response.role && response.role === "Student") {
                    window.location.assign('/student');
                } else if (response.role && response.role === "Admin") {
                    window.location.assign('/admin');
                } else {
                    alert(response.message || "Неправильный логин или пароль, попробуйте еще раз!");
                }
            },
            error: function() {
                alert("Произошла ошибка");
            }
        });
    });
});