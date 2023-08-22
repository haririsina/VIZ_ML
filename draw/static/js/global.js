const SECTION_SELECT_DATASET = "section_select_dataset"
const SECTION_SELECT_DIAGRAM = "section_select_diagram"
const SECTION_SELECT_FIELDS = "section_select_fields"

const dialog_wrapper = document.querySelector(".dialog_wrapper")
const container = document.querySelector("#container")
const dialog_title = document.querySelector(".dialog_title")
const dialog_content = document.querySelector(".dialog_content")
const dialog_btn_yes = document.querySelector(".dialog_yes_btn")
const section_select_dataset = document.querySelector("#section_select_dataset")
const section_select_diagram = document.querySelector("#section_select_diagram")
const section_select_fields = document.querySelector("#section_select_fields")

const loading_container = document.querySelector(".loading_container")
const loading_text = document.querySelector(".loading_text")

const _btn_back_to_dashboard = document.querySelector("#_back_to_dashboard")

let loading = (show, hint = "") => {
    let loading_display = show ? "flex" : "none"

    loading_container.style.display = loading_display
    loading_text.innerText = hint

    if (show) {
        container.classList.add("blured")
    } else {
        container.classList.remove("blured")
    }
}


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

const navigateTo = section_name => {
    switch(section_name) {
        case SECTION_SELECT_DATASET:
            check_tip_four_status()
            section_select_diagram.style.display = "none"
            section_select_fields.style.display = "none"
            section_select_dataset.style.display = "flex"
            break
        case SECTION_SELECT_DIAGRAM:
            window.location.replace("http://127.0.0.1:8000/panel/draw")
            break
        case SECTION_SELECT_FIELDS:
            load_dataset_fields()
            section_select_dataset.style.display = "none"
            section_select_fields.style.display = "flex"
            break
    }
}

_btn_back_to_dashboard.onclick = () => {
    window.location.replace("http://127.0.0.1:8000/panel")
}