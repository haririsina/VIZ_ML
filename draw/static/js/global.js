const dialog_wrapper = document.querySelector(".dialog_wrapper")
const container = document.querySelector("#container")
const dialog_title = document.querySelector(".dialog_title")
const dialog_content = document.querySelector(".dialog_content")
const dialog_btn_yes = document.querySelector(".dialog_yes_btn")


const dialog = (show, title = "", content = "") => {
    let dialog_display = show ? "flex" : "none"

    dialog_wrapper.style.display = dialog_display
    dialog_title.innerText = title
    dialog_content.innerText = content

    if (show) {
        container.classList.add("blured")
    } else {
        container.classList.remove("blured")
    }
}

dialog_btn_yes.onclick = () => {
    dialog(false)
}

dialog_wrapper.onclick = (e) => {
    if (e.target == dialog_wrapper) {
        dialog(false)
    }
}
