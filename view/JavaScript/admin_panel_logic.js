$(document).ready(function () {
    $(".add_person").click(function () {
        $(".main_field").html(`
            <div class="form_container">
                <h3>Добавить пользователя</h3>
                <form id="add_user_form">
                    <label for="role">Выберите роль: </label>
                    <select id="role" name="role">
                        <option value="Teacher">Учитель</option>
                        <option value="Student">Студент</option> 
                        <option value="Admin">Администратор</option>
                    </select>
                    <label for="login">Введите логин: </label>
                    <input type="text" id="login" name="login" placeholder="Введите логин" required>
                    <label for="password">Введите пароль: </label>
                    <input type="text" id="password" name="password" placeholder="Введите пароль" required>
                    <button type="submit" class="adm_button">Добавить</button>
                </form>
            </div>
            <div class="main_page">
                <button type="button" class="back_to_main">На главную</button>
            </div>
        `);
    });

    $(".delete_person").click(function () {
        $(".main_field").html(`
            <div class="form_container">
                <h3>Удалить пользователя</h3>
                <form id="delete_user_form">
                    <label for="ID">Введите ID: </label>
                    <input type="text" id="ID" name="ID" placeholder="Введите ID" required>
                    <button type="submit" class="adm_button">Удалить</button>
                </form>
            </div>
            <div class="main_page">
                <button type="button" class="back_to_main">На главную</button>
            </div>
        `);
    });
    $(".users").click(function () {
        $(".main_field").html(`<div class="user_list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Логин</th>
                  <th>Пароль</th>
                  <th>Роль</th>
                </tr>
              </thead>
              <tbody id="user_table">
              </tbody>
            </table>
          </div>`
        );
        $.ajax({
            url: "users/get_users",
            method: "GET",
            success: function(users) {
                const userTable = $("#user_table");
                users.data.forEach((user) => {
                    if (user.role !== "Admin") {
                    userTable.append(`
                        <tr>
                            <td class='copy-id' data-id='${user._id}'>${user._id}</td>
                            <td>${user.userName}</td>
                            <td>${user.password}</td>
                            <td>${user.role}</td>
                        </tr>
                    `);
                    }
                });
                
            },
            error: function(err) {
                console.error("Ошибка при загрузке пользователей", err);
            }
        })
    })

    $(document).on("click", ".copy-id", function() {
        const id = $(this).data("id");
        const role = $(this).data("role");
        navigator.clipboard.writeText(id)
        .then(() => {
            alert("ID скопирован в буфер обмена: " + id);
        })
        .catch( err => {
            console.error("Ошибка при копировании ID", err);
        })
    });

    $(document).on("click", ".back_to_main", function () {
        location.reload();
    });

    $(document).on("submit", "#add_user_form", function (event) {
        event.preventDefault(); 

        const userData = {
            userName: $("#login").val(),
            password: $("#password").val(),
            role: $("#role").val()
        };

        console.log("Отправка данных:", JSON.stringify(userData));

        $.ajax({
            url: "users/create",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: function (response) {
                console.log("Пользователь добавлен: ", response);
                alert("Пользователь успешно добавлен!");
                $("#add_user_form")[0].reset();
            },
            error: function (err) {
                console.error("Ошибка добавления пользователя:", err);
                alert("Произошла ошибка при добавлении!");
            }
        });
    });

    $(document).on("submit", "#delete_user_form", function (event) {
        event.preventDefault();

        const userID = $("#ID").val();
        const role = $("#role").val();

        console.log("Удаление пользователя с ID:", userID);

        $.ajax({
            url: "users/delete",
            method: "DELETE",
            contentType: "application/json",
            data: JSON.stringify({ id: userID, role: role}),
            success: function (response) {
                console.log("Пользователь удален: ", response);
                alert("Пользователь успешно удален!");
                $("#delete_user_form")[0].reset();
            },
            error: function (err) {
                console.error("Ошибка удаления пользователя:", err);
                alert("Произошла ошибка при удалении!");
            }
        });
    });
});
