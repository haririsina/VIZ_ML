const DIAGRAM_LINEAR_CHART = "diagram_linear_chart"
const DIAGRAM_SCATTER = "diagram_scatter"
const DIAGRAM_SCATTER_MATRIX = "diagram_scatter_matrix"
const DIAGRAM_AREA_CHART = "diagram_area_chart"
const DIAGRAM_BUBBLE_CHART = "diagram_bubble_chart"
const DIAGRAM_CHOROPLETH_MAP = "diagram_choropleth_map"
const DIAGRAM_HISTOGRAM = "diagram_histogram"
const DIAGRAM_PARALLEL_COORDINATES = "diagram_parallel_coordinates"
const DIAGRAM_BAR_CHART = "diagram_bar_chart"
const DIAGRAM_STACKED_BAR_CHART = "diagram_stacked_bar_chart"
const DIAGRAM_CLUSTERED_BAR_CHART = "diagram_clustered_bar_chart"
const DIAGRAM_TABLE = "diagram_table"
const DIAGRAM_TREEMAP = "diagram_treemap"
const DIAGRAM_PIE_CHART = "diagram_pie_chart"
const DIAGRAM_RADAR = "diagram_radar"


const back_to_dataset = document.querySelector("#back_to_dataset")

let selected_diagram


back_to_dataset.onclick = () => {
    navigateTo(SECTION_SELECT_DATASET)
}

const on_digram_clicked = (elmnt) => {
    selected_diagram = elmnt.getAttribute("id")
}