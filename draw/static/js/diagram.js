const diagram_container = document.querySelector(".diagram_container")
const diagram_frame = document.querySelector("iframe")


function show_diagram(url) {
    diagram_container.style.display = "block"
    section_select_fields.style.display = "none"
    diagram_frame.src = url
}