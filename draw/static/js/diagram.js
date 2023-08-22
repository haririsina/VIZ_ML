const diagram_container = document.querySelector(".diagram_container")
const diagram_frame = document.querySelector("iframe")
const _back_to_dashboard = document.querySelector("#_back_to_dashboard")


function show_diagram(url) {
    diagram_container.style.display = "block"
    section_select_fields.style.display = "none"
    diagram_frame.src = url
}

_back_to_dashboard.onclick = () => {
    window.location.replace("http://127.0.0.1:8000/panel")
}