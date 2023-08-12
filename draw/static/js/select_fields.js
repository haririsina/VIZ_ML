const fields_container = document.querySelector("#fields_container")
const field_item_sample = document.querySelector(".field_container.sample")
const question_container_field_type = document.querySelector(".question_container .field_type span")
const btn_submit_fields = document.querySelector("#btn_submit_fields")
const btn_back_to_dataset = document.querySelector("#back_to_dataset")

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

    switch (selected_diagram) {
        case DIAGRAM_SCATTER_MATRIX:
            question_container_field_type.innerText = "هدف (اختیاری)"
            btn_submit_fields.style.display = "block"
            break
        case DIAGRAM_HISTOGRAM:
        case DIAGRAM_NETWORK:
            question_container_field_type.innerText = "متغیر 1"
            break
        default:
            question_container_field_type.innerText = "هدف"
    }

    loading(false)
}


const on_field_clicked = (elmnt) => {
    let elmnt_title = elmnt.querySelector("p")
    let label_target = elmnt.querySelector(".label_target")
    let label_variable = elmnt.querySelector(".label_variable")
    let selected = elmnt.classList.contains('selected')

    if (!selected) {
        elmnt.classList.add('selected')

        if (!dataset_target && selected_diagram != DIAGRAM_SCATTER_MATRIX && selected_diagram != DIAGRAM_HISTOGRAM && selected_diagram != DIAGRAM_NETWORK) {
            label_target.style.display = "block"
            dataset_target = elmnt_title.innerText
        } else {
            dataset_variables.push(elmnt_title.innerText)
            label_variable.innerText = "متغیر" + dataset_variables.length
            label_variable.style.display = "block"
            label_variable.setAttribute("data-var-num", dataset_variables.length)
        }

        question_container_field_type.innerText = "متغیر" + (dataset_variables.length + 1)
    } else {
        elmnt.classList.remove('selected')

        if (label_target.style.display != "none" && label_target.style.display != "") {
            label_target.style.display = "none"
            dataset_target = undefined
            question_container_field_type.innerText = "هدف"
        } else if (label_variable.style != "none") {
            label_variable.style.display = "none"
            dataset_variables.splice(
                dataset_variables.indexOf(elmnt_title.innerText), 1
            )
            document.querySelectorAll("[data-var-num]").forEach(item => {
                item.setAttribute("data-var-num", parseInt(item.getAttribute("data-var-num")) - 1)
                item.innerText = "متغیر" + item.getAttribute("data-var-num")
            })
            question_container_field_type.innerText = "متغیر" + (dataset_variables.length + 1)
        }
    }

    switch(selected_diagram) {
        case DIAGRAM_PIE_CHART:
        case DIAGRAM_RADAR:
            if (dataset_target && dataset_variables.length == 1) {
                send_diagram_data()
            }
            break
        case DIAGRAM_LINE_CHART:
        case DIAGRAM_STACKED_LINE_CHART:
        case DIAGRAM_AREA_CHART:
        case DIAGRAM_STACKED_AREA_CHART:
        case DIAGRAM_DOT_AND_LINE_CHART:
        case DIAGRAM_SCATTER:
        case DIAGRAM_BAR_CHART:
        case DIAGRAM_STACKED_BAR_CHART:
        case DIAGRAM_CLUSTERED_BAR_CHART:
            if (dataset_target && dataset_variables.length == 2) {
                send_diagram_data()
            } else if (dataset_target && dataset_variables.length == 1) {
                btn_submit_fields.style.display = "block"
            } else {
                btn_submit_fields.style.display = "none"
            }
            break
        case DIAGRAM_HEAT_MAP:
        case DIAGRAM_DENSITY_PLOT:
        case DIAGRAM_BUBBLE_CHART:
            if (dataset_target && dataset_variables.length == 2) {
                send_diagram_data()
            }
            break
        case DIAGRAM_HISTOGRAM:
            if (dataset_variables.length == 2) {
                send_diagram_data()
            } else if (dataset_variables.length == 1) {
                btn_submit_fields.style.display = "block"
            } else {
                btn_submit_fields.style.display = "none"
            }
            break
        case DIAGRAM_SCATTER_MATRIX:
        case DIAGRAM_PARALLEL_COORDINATES:
            if (dataset_variables.length >= 2) {
                btn_submit_fields.style.display = "block"
            } else {
                btn_submit_fields.style.display = "none"
            }
            break
        case DIAGRAM_TABLE:
        case DIAGRAM_TREEMAP:
            if (dataset_variables.length >= 1) {
                btn_submit_fields.style.display = "block"
            } else {
                btn_submit_fields.style.display = "none"
            }
            break
        case DIAGRAM_NETWORK:
            if (dataset_variables.length == 5) {
                send_diagram_data()
            }
    }
}

btn_submit_fields.onclick = () => {
    send_diagram_data()
}

function send_diagram_data() {
    loading(true, "در حال پردازش، لطفا صبر کنید")

    let data = {
        diagram_name: selected_diagram,
        dataset: dataset_data,
        target: dataset_target,
        variables: dataset_variables
    }

    let formData = new FormData()
    formData.append("diagram_name", selected_diagram.replaceAll("_", " "))
    formData.append("dataset", dataset_data)
    formData.append("target", dataset_target)
    formData.append("variables", JSON.stringify(dataset_variables))

    fetch("http://127.0.0.1:8000/panel/draw/4631f492-e29b-4b75-92f0-68de73580db8", {
        method: 'POST',
        body: formData
    }).then(r => {
        loading(false)
        r.json().then(j => {
            if (r.status == 200 && !j.url.endsWith("None")) {
                show_diagram(j.url)
            } else {
                dialog(true, "خطا در رسم نمودار", "لطفا ساختاری دیتاست و فیلد های انتخابی خود را بررسی کنید.")
            }
        }).catch(e => {
            dialog(true, "خطا در رسم نمودار", "لطفا ساختاری دیتاست و فیلد های انتخابی خود را بررسی کنید.")
        })
    })
}

btn_back_to_dataset.onclick = () => {
    btn_submit_fields.style.display = 'none'
    dataset_target = undefined
    dataset_variables = []
    document.querySelectorAll(".field_container:not(sample)").forEach(elmnt => {
        elmnt.remove()
    })
    navigateTo(SECTION_SELECT_DATASET)
}