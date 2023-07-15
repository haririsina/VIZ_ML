const fields_container = document.querySelector("#fields_container")
const field_item_sample = document.querySelector(".field_container.sample")
const question_container_target = document.querySelector(".question_container .target")
const question_container_variable = document.querySelector(".question_container .variable")

let dataset_target 
let dataset_variables = []

const load_dataset_fields = () => {
    dataset_columns_titles.forEach(title => {
        let field_item = field_item_sample.cloneNode(true)
        field_item.querySelector("p").innerText = title
        field_item.classList.remove('sample')
        fields_container.appendChild(
            field_item
        )
    })
}

load_dataset_fields()

const on_field_clicked = (elmnt) => {
    let elmnt_title = elmnt.querySelector("p")
    let label_target = elmnt.querySelector(".label_target")
    let label_variable = elmnt.querySelector(".label_variable")
    let selected = elmnt.classList.contains('selected')

    if (!selected) {
        elmnt.classList.add('selected')

        if (!dataset_target) {
            label_target.style.display = "block"
            dataset_target = elmnt_title.innerText
            question_container_target.style.display = "none"
            question_container_variable.style.display = "block"
        } else {
            label_variable.style.display = "block"
            dataset_variables.push(elmnt_title.innerText)
        }
    } else {
        elmnt.classList.remove('selected')

        if (label_target.style.display != "none" && label_target.style.display != "") {
            label_target.style.display = "none"
            dataset_target = undefined
            question_container_target.style.display = "block"
            question_container_variable.style.display = "none"
        } else if (label_variable.style != "none") {
            label_variable.style.display = "none"
            dataset_variables.splice(
                dataset_variables.indexOf(elmnt_title.innerText), 1
            )
        }
    }
}