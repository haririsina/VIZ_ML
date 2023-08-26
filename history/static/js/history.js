const back_to_panel = document.querySelector("#back_to_panel")
const _back_to_dashboard = document.querySelector("#_back_to_dashboard")
const diagram_iframe = document.querySelector("iframe")
const container = document.querySelector("#container")
const no_diagram_container = document.querySelector("#no_diagram_container")
const diagram_sample = document.querySelector(".sample")
const content_container = document.querySelector(".content_container")
const diagram_container = document.querySelector(".diagram_container")
const inner_container = document.querySelector(".inner_container")

const loading_container = document.querySelector(".loading_container")
const loading_text = document.querySelector(".loading_text")

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

back_to_panel.onclick = () => {
    window.location.replace("http://127.0.0.1:8000/panel")
}

_back_to_dashboard.onclick = () => {
    diagram_container.style.display = "none"
    inner_container.style.display = "flex"
}

function on_digram_clicked(elmnt) {
    diagram_container.style.display = "flex"
    inner_container.style.display = "none"
    diagram_iframe.src = elmnt.getAttribute("data-url")
}

loading(true, "در حال دریافت اطلاعات، لطفا صبر کنید ...")

fetch("http://127.0.0.1:8000/panel/history/4631f492-e29b-4b75-92f0-68fh47980db8", {
        method: "GET",
        headers: {
            Authorization: "Token " + localStorage['token']
        }
    }).then(response => {
        response.json().then(data => {
            if (response.status == 200) {
                if (data.length > 0) {
                    no_diagram_container.style.display = "none"
                    data.forEach(item => {
                        new_diagram = diagram_sample.cloneNode(true)
                        new_diagram.setAttribute("data-url", "http://127.0.0.1:8000/media/" + item.url)
                        new_diagram.querySelector("img").src = "http://127.0.0.1:8000/media/" + item.url.replaceAll(".html", ".png")
                        new_diagram.querySelector("p").innerText = item.create_datetime.split("T")[0]
                        new_diagram.classList.remove('sample')
                        content_container.insertBefore(new_diagram, content_container.firstChild);
                    });
                } else {
                    no_diagram_container.style.display = "flex"
                }
            } else {
                dialog(true, "خطا", "خطا در برقراری ارتباط، لطفا مجددا تلاش کنید")
            }

            loading(false)
        })
    }).catch(err => {
        loading(false)
        dialog(true, "خطا", "خطا در برقراری ارتباط، لطفا مجددا تلاش کنید")
    })