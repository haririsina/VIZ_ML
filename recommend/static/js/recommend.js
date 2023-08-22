const question = document.querySelector("#card_question p")
const answer_yes = document.querySelector("#card_answer_yes div")
const answer_no = document.querySelector("#card_answer_no div")
const question_hint = document.querySelector("#card_question_hint")
const yes_hint = document.querySelector("#card_yes_hint")
const no_hint = document.querySelector("#card_no_hint")
const dialog_wrapper = document.querySelector(".dialog_wrapper")
const dialog_title = document.querySelector(".dialog_title")
const dialog_content = document.querySelector(".dialog_content")
const dialog_btn_yes = document.querySelector(".dialog_yes_btn")
const dialog_btn_no = document.querySelector(".dialog_no_btn")
const container = document.querySelector(".container")
const plot_image_wrapper = document.querySelector(".plot_image_wrapper")
const plot_image = document.querySelector(".plot_image_wrapper img")
const success_container = document.querySelector(".success_container")
const cards_container = document.querySelector(".cards_container")
const success_animation = document.querySelector("#success_animation")
const recommended_chart = document.querySelector("#recommended_chart")
const success_yes_btn = document.querySelector(".success_yes_btn")
const success_no_btn = document.querySelector(".success_no_btn")
const back_to_panel = document.querySelector("#back_to_panel")


async function get_next_question(next_node_id) {
    response = await fetch("http://127.0.0.1:8000/core/ee85d908-f8f2-473e-a666-8c4d12507f5e", {
        method: 'POST',
        body: JSON.stringify({next_node_id: next_node_id})
    })

    return await response.json()
}

function load_node_data(data) {
    question.innerHTML = data['phrase']
    answer_yes.setAttribute('data-nextid', data['yes_node'])
    answer_no.setAttribute('data-nextid', data['no_node'])

    if (data['phrase_hint'] != "") {
        question_hint.style.display = "flex"
        question_hint.setAttribute("data-hint", data['phrase_hint'])
    } else {
        question_hint.style.display = "none"
    }

    if (data['yes_hint'] != "") {
        yes_hint.style.display = "flex"
        yes_hint.setAttribute("data-hint", data['yes_hint'])
    } else {
        yes_hint.style.display = "none"
    }

    if (data['no_hint'] != "") {
        no_hint.style.display = "flex"
        no_hint.setAttribute("data-hint", data['no_hint'])
    } else {
        no_hint.style.display = "none"
    }

    if (data['no_url'] != "") {
        yes_hint.setAttribute("data-hint-url", data['yes_url'])
    }

    if (data['yes_url'] != "") {
        no_hint.setAttribute("data-hint-url", data['no_url'])
    }

}

async function answer_clicked(elmnt) {
    answer_data = elmnt.getAttribute('data-nextid')
    if (parseInt(answer_data)) {
        load_node_data(await get_next_question(answer_data))
    } else {
        recommended_chart.innerText = answer_data
        cards_container.style.display = 'none'
        success_container.style.display = 'flex'
        success_animation.play()
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

question_hint.onclick = (e) => {
    dialog(true, "راهنما", question_hint.getAttribute("data-hint"))
    dialog_btn_no.style.display = "none"
}

yes_hint.onclick = (e) => {
    if (e.target == yes_hint || e.target == yes_hint.querySelector("i") || e.target == yes_hint.querySelector("span")) {
        dialog(true, "راهنما", yes_hint.getAttribute("data-hint"))
        if (yes_hint.getAttribute("data-hint-url") && yes_hint.getAttribute("data-hint-url") != "") {
            dialog_btn_no.style.display = "flex"
            dialog_btn_no.setAttribute("data-hint-url", yes_hint.getAttribute("data-hint-url"))
        } else {
            dialog_btn_no.style.display = "none"
        }
    }
}

no_hint.onclick = (e) => {
    if (e.target == no_hint) {
        dialog(true, "راهنما", no_hint.getAttribute("data-hint"))
        if (no_hint.getAttribute("data-hint-url") && no_hint.getAttribute("data-hint-url") != "") {
            dialog_btn_no.style.display = "flex"
            dialog_btn_no.setAttribute("data-hint-url", no_hint.getAttribute("data-hint-url"))
        } else {
            dialog_btn_no.style.display = "none"
        }
    }
}

dialog_btn_no.onclick = () => {
    plot_image.src = dialog_btn_no.getAttribute("data-hint-url")
    plot_image_wrapper.style.display = "flex"
}

plot_image_wrapper.onclick = () => {
    plot_image_wrapper.style.display = "none"
}

success_yes_btn.onclick = () => {
    window.location.replace("http://127.0.0.1:8000/panel/draw?diagram=" + recommended_chart.innerText.replaceAll(" ", "_"))
}

success_no_btn.onclick = () => {
    window.location.replace("http://127.0.0.1:8000/panel")
}

back_to_panel.onclick = () => {
    window.location.replace("http://127.0.0.1:8000/panel")
}

(async () => {
    load_node_data(await get_next_question("0"))
})()