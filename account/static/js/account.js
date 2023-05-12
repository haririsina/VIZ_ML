const container = document.querySelector("#container")
const bg = document.querySelector("#bg")

const form_login = document.querySelector("#login_form")
const form_register = document.querySelector("#register_form")

const input_register_first_name = document.querySelector("#register_first_name")
const input_register_last_name = document.querySelector("#register_last_name")
const input_register_email = document.querySelector("#register_email")
const input_register_pass = document.querySelector("#register_pass")
const input_register_pass_repeat = document.querySelector("#register_pass_repeat")
const input_login_username = document.querySelector("#login_username")
const input_login_pass = document.querySelector("#login_pass")

const btn_login = document.querySelector("#btn_login")
const btn_register = document.querySelector("#btn_register")

const btn_switch_to_register = document.querySelector("#switch_to_register")
const btn_switch_to_login = document.querySelector("#switch_to_login")

const loading_container = document.querySelector(".loading_container")
const loading_text = document.querySelector(".loading_text")

const dialog_wrapper = document.querySelector(".dialog_wrapper")
const dialog_title = document.querySelector(".dialog_title")
const dialog_content = document.querySelector(".dialog_content")
const dialog_btn_yes = document.querySelector(".dialog_yes_btn")

let loading = (show, hint = "") => {
    let loading_display = show ? "flex" : "none"

    loading_container.style.display = loading_display
    loading_text.innerText = hint

    if (show) {
        container.classList.add("blured")
        bg.classList.add("blured")
    } else {
        container.classList.remove("blured")
        bg.classList.remove("blured")
    }
}

let dialog = (show, title = "", content = "") => {
    let dialog_display = show ? "flex" : "none"

    dialog_wrapper.style.display = dialog_display
    dialog_title.innerText = title
    dialog_content.innerText = content

    if (show) {
        container.classList.add("blured")
        bg.classList.add("blured")
    } else {
        container.classList.remove("blured")
        bg.classList.remove("blured")
    }
}

let validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

dialog_btn_yes.onclick = () => {
    dialog(false)
}

dialog_wrapper.onclick = (e) => {
    if (e.target == dialog_wrapper) {
        dialog(false)
    }
}

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

input_register_first_name.onkeypress = (e) => {
    let charCode = (e.which) ? e.which : e.keyCode
    if (charCode < 31 || (charCode >= 48 && charCode <= 57))
        return false;
    return true;
}

input_register_last_name.onkeypress = (e) => {
    let charCode = (e.which) ? e.which : e.keyCode
    if (charCode < 31 || (charCode >= 48 && charCode <= 57))
        return false;
    return true;
}

btn_register.onclick = async () => {
    if (input_register_first_name.value.trim() == "") {
        input_register_first_name.style.borderColor = "#e63946"
        dialog(true, "خطا", "لطفا تمامی فیلد ها را وارد کنید")
        return
    }

    if (input_register_last_name.value.trim() == "") {
        input_register_last_name.style.borderColor = "#e63946"
        dialog(true, "خطا", "لطفا تمامی فیلد ها را وارد کنید")
        return
    }

    if (input_register_email.value.trim() == "") {
        input_register_email.style.borderColor = "#e63946"
        dialog(true, "خطا", "لطفا تمامی فیلد ها را وارد کنید")
        return
    }

    if (input_register_pass.value.trim() == "") {
        input_register_pass.style.borderColor = "#e63946"
        dialog(true, "خطا", "لطفا تمامی فیلد ها را وارد کنید")
        return
    }

    if (input_register_pass_repeat.value.trim() == "") {
        input_register_pass_repeat.style.borderColor = "#e63946"
        dialog(true, "خطا", "لطفا تمامی فیلد ها را وارد کنید")
        return
    }
    
    if (input_register_first_name.value.trim().length < 3) {
        input_register_first_name.style.borderColor = "#e63946"
        dialog(true, "خطا", "فیلد نام نمی تواند کمتر از 3 حرف باشد")
        return
    }

    if (input_register_last_name.value.trim().length < 3) {
        input_register_last_name.style.borderColor = "#e63946"
        dialog(true, "خطا", "فیلد نام خانوادگی نمی تواند کمتر از 3 حرف باشد")
        return
    }

    if (!validateEmail(input_register_email.value)) {
        input_register_email.style.borderColor = "#e63946"
        dialog(true, "خطا", "فرمت ایمیل صحیح نیست")
    }

    if (input_register_pass.value.length < 8) {
        input_register_pass.style.borderColor = "#e63946"
        dialog(true, "خطا", "رمز عبور حداقل باید شامل 8 کاراکتر باشد")
        return
    }

    if (input_register_pass.value != input_register_pass_repeat.value) {
        input_register_pass.style.borderColor = "#e63946"
        input_register_pass_repeat.style.borderColor = "#e63946"
        dialog(true, "حطا", "رمز عبور با تکرار آن مطابقت ندارد")
        return
    }

    loading(true, "در حال ارسال اطلاعات، لطفا صبر کنید ...")

    
    response = await fetch("http://127.0.0.1:8000/account/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "first_name": input_register_first_name.value,
            "last_name": input_register_last_name.value,
            "email": input_register_email.value,
            "password": input_register_pass.value,
            "password_repeat": input_register_pass_repeat.value
        })
    }).catch(err => {
        loading(false)
        dialog(true, "خطا", "خطا در برقراری ارتباط، لطفا مجددا تلاش کنید")
    })

    if (!response) return

    let data = await response.json()
    loading(false)

    if (response.status == 201) {
        dialog(true, "حساب شما ایجاد شد!", "برای وارد شدن به حساب کاربری خود از صفحه ورود استفاده کنید")
        form_register.style.opacity = "0"
        setTimeout(() => {
            form_register.style.display = "none"
            form_login.style.display = "block"
            form_login.style.opacity = "1"

        }, 300)
    } else if (response.status == 400) {
        if (data["email"] && data["email"].includes("user with this email adress already exists.")) {
            dialog(true, "حساب ایجاد نشد!", "ایمیل وارد شده قبلا ثبت شده است")
        } else if (data["password"] && data["password"].includes("Password fields didn't match.")) {
            dialog(true, "حساب ایجاد نشد!", "رمز عبور با تکرار آن مطابقت ندارد")
        } else {
            dialog(true, "حساب ایجاد نشد!", "لطفا اطلاعات وارد شده را بررسی و مجددا تلاش کنید")
        }
    } else {
        dialog(true, "خطا", "خطا در برقراری ارتباط، لطفا مجددا تلاش کنید")
    }
}

input_register_first_name.addEventListener("focus", () => {
    input_register_first_name.style.borderColor = "#dddddd"
})

input_register_last_name.addEventListener("focus", () => {
    input_register_last_name.style.borderColor = "#dddddd"
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