$(document).ready(function() {

    let params = new URLSearchParams(window.location.search);
    if (params.get("err") === "session_expired") {
        toastr.error("Sesi anda telah berakhir, silahkan login kembali")
    }

    $("form").submit(async function (e) {
        e.preventDefault();
        const username = $("#username").val();
        const password = $("#password").val();
        if (username === "" || password === "") {
            toastr.error("Please fill in all fields", "Error");
            return;
        }

        await $.ajax({
            url: `${base_api_url}auth/login`,
            type: "POST",
            data: {
                username: username,
                password: password
            },
        });

        location.href = base_url
    })
})