
const form_login = document.querySelector("#login_form")
const form_register = document.querySelector("#register_form")

const input_register_first_name = document.querySelector("#register_first_name")
const input_register_last_name = document.querySelector("#register_last_name")
const input_register_username = document.querySelector("#register_username")
const input_register_email = document.querySelector("#register_email")
const input_register_pass = document.querySelector("#register_pass")
const input_register_pass_repeat = document.querySelector("#register_pass_repeat")
const input_login_username = document.querySelector("#login_username")
const input_login_pass = document.querySelector("#login_pass")

const btn_login = document.querySelector("#btn_login")
const btn_register = document.querySelector("#btn_register")

const btn_switch_to_register = document.querySelector("#switch_to_register")
const btn_switch_to_login = document.querySelector("#switch_to_login")


btn_switch_to_register.onclick = () => {
    form_login.style.opacity = "0"
    setTimeout(() => {
        form_login.style.display = "none"
        form_register.style.display = "block"
        form_register.style.opacity = "1"
    }, 300)
}


btn_switch_to_login.onclick = () => {
    form_register.style.opacity = "0"
    setTimeout(() => {
        form_register.style.display = "none"
        form_login.style.display = "block"
        form_login.style.opacity = "1"
    }, 300)
}

btn_login.onclick = async () => {
    if (input_login_username.value.trim() == "") {
        input_login_username.style.borderColor = "#e63946"
        return
    }

    if (input_login_pass.value.trim() == "") {
        input_login_pass.style.borderColor = "#e63946"
        return
    }

    result = await fetch("http://localhost:8000/account/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": input_login_username.value,
            "password": input_login_pass.value
        })
    })

    if (result.status == 200) {
        window.location.replace("http://localhost:8000/panel")
    } else {
        alert("Login failed!")
    }
}

input_login_username.addEventListener("focus", () => {
    input_login_username.style.borderColor = "#dddddd"
})

input_login_pass.addEventListener("focus", () => {
    input_login_pass.style.borderColor = "#dddddd"
})

btn_register.onclick = async () => {
    if (input_register_first_name.value.trim() == "") {
        input_register_first_name.style.borderColor = "#e63946"
        return
    }

    if (input_register_last_name.value.trim() == "") {
        input_register_last_name.style.borderColor = "#e63946"
        return
    }

    if (input_register_email.value.trim() == "") {
        input_register_email.style.borderColor = "#e63946"
        return
    }

    if (input_register_username.value.trim() == "") {
        input_register_username.style.borderColor = "#e63946"
        return
    }

    if (input_register_pass.value.trim() == "") {
        input_register_pass.style.borderColor = "#e63946"
        return
    }

    if (input_register_pass_repeat.value.trim() == "") {
        input_register_pass_repeat.style.borderColor = "#e63946"
        return
    }

    if (input_register_pass.value.trim() != input_register_pass_repeat.value.trim()) {
        input_register_pass.style.borderColor = "#e63946"
        input_register_pass_repeat.style.borderColor = "#e63946"
        return
    }

    result = await fetch("http://localhost:8000/account/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "first_name": input_register_first_name.value,
            "last_name": input_register_last_name.value,
            "username": input_register_username.value,
            "email": input_register_email.value,
            "password": input_register_pass.value
        })
    })

    if (result.status == 200) {
        alert("Success! Please login to your account.")

        form_register.style.opacity = "0"
        setTimeout(() => {
            form_register.style.display = "none"
            form_login.style.display = "block"
            form_login.style.opacity = "1"
        }, 300)
    } else {
        alert("Registration failed!")
    }
}

input_register_first_name.addEventListener("focus", () => {
    input_register_first_name.style.borderColor = "#dddddd"
})

input_register_last_name.addEventListener("focus", () => {
    input_register_last_name.style.borderColor = "#dddddd"
})

input_register_username.addEventListener("focus", () => {
    input_register_username.style.borderColor = "#dddddd"
})

input_register_email.addEventListener("focus", () => {
    input_register_email.style.borderColor = "#dddddd"
})

input_register_pass.addEventListener("focus", () => {
    input_register_pass.style.borderColor = "#dddddd"
})

input_register_pass_repeat.addEventListener("focus", () => {
    input_register_pass_repeat.style.borderColor = "#dddddd"
})