$(document).ready(function() {

    $('.firstBtn').click(function() {
        let Login = $('input[name="auth_login"]').val();
        let Password = $('input[name="auth_pass"]').val();

        console.log("JSON", JSON.stringify({
            userName: Login,
            password: Password,
        }))
    
        console.log("Login:", Login);
        console.log("Pass:", Password);
        $.ajax({
            url: "/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                userName: Login,
                password: Password,
            }),
            success: function(response) {    
            console.log("response from server:", response);
                if (response.role && response.role[0] === "Teacher") {
                    window.location.assign('/main');
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