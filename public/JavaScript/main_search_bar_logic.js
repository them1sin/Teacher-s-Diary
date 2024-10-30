$(document).ready(function() {
    const groupName = "4411";

    $('.search_button').click(function() {
        let groupID = $('#search_text').val();
        let originalPlaceholder = $('#search_text').attr("placeholder");

        if (groupID === groupName) {
            $('#search_text').val("").attr("placeholder", "Группа найдена!");
        } else {
            $('#search_text').val("").attr("placeholder", "Группа не найдена!");

        }
        setTimeout(function() {;
            $('#search_text').attr("placeholder", originalPlaceholder);
        }, 2000);
    })
})