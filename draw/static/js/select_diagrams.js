const DIAGRAM_LINE_CHART = "Line_Chart"
const DIAGRAM_STACKED_LINE_CHART = "Stacked_Line_Chart"
const DIAGRAM_SCATTER = "Scatter_Plot"
const DIAGRAM_SCATTER_MATRIX = "Scatter_Plot_Matrix"
const DIAGRAM_AREA_CHART = "Area_Chart"
const DIAGRAM_STACKED_AREA_CHART = "Stacked_Area_Chart"
const DIAGRAM_BUBBLE_CHART = "Bubble_Chart"
const DIAGRAM_HISTOGRAM = "Histogram"
const DIAGRAM_PARALLEL_COORDINATES = "Parallel_Coordinates_Plot"
const DIAGRAM_BAR_CHART = "Bar_Chart"
const DIAGRAM_STACKED_BAR_CHART = "Stacked_Bar_Chart"
const DIAGRAM_CLUSTERED_BAR_CHART = "Clustered_Bar_Chart"
const DIAGRAM_TABLE = "Table"
const DIAGRAM_TREEMAP = "Treemap"
const DIAGRAM_PIE_CHART = "Pie_Chart"
const DIAGRAM_RADAR = "Radar_Plot"
const DIAGRAM_NETWORK = "Network"
const DIAGRAM_HEAT_MAP = "Heat_Map"
const DIAGRAM_DENSITY_PLOT = "Density_Plot"
const DIAGRAM_DOT_AND_LINE_CHART = "Dot_and_line_chart"

const back_to_panel = document.querySelector("#back_to_panel")



let selected_diagram

const on_digram_clicked = (elmnt) => {
    selected_diagram = elmnt.getAttribute("id")
    navigateTo(SECTION_SELECT_DATASET)
    // load_dataset_fields()
}

let urlParams = new URLSearchParams(window.location.search);
let param = urlParams.get('diagram');

if (param) {
    selected_diagram = param
    navigateTo(SECTION_SELECT_DATASET)
}

back_to_panel.onclick = () => {
    window.location.replace("http://127.0.0.1:8000/panel")
}