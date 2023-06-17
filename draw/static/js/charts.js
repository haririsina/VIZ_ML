const DIAGRAM_BAR_CHART = "Bar Chart"
const DIAGRAM_LINE_CHART = "Line Chart"
const DIAGRAM_PIE_CHART = "Pie Chart"
const DIAGRAM_SCATTER_CHART = "Scatter Chart"
const DIAGRAM_AREA_CHART = "Area Chart"
const DIAGRAM_BUBBLE_CHART = "Bubble Chart"
const DIAGRAM_TABLE = "Table"
const DIAGRAM_CHOROPLETH_MAP = "Choropleth Map"
const DIAGRAM_HISTOGRAM = "Histogram"
const DIAGRAM_TREE_MAP = "Tree Map"


const draw_chart = (_data, diagram, elmnt, options) => {
    var data = google.visualization.arrayToDataTable(_data)

    // dashboard_draw_option_phase.style.display = "none"
    // dashboard_draw_chart_phase.style.display = "flex"   
    
    switch(diagram) {
        case DIAGRAM_BAR_CHART:
            var view = new google.visualization.DataView(data);
            view.setColumns([
                    0, 1, { calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation" }
            ]);

            var chart = new google.visualization.BarChart(elmnt);
            chart.draw(view, options)
            break
        case DIAGRAM_LINE_CHART:
            var chart = new google.visualization.LineChart(elmnt);
            chart.draw(data, options)
            break
        case DIAGRAM_PIE_CHART:
            var chart = new google.visualization.PieChart(elmnt);
            chart.draw(data, options)
            break
        case DIAGRAM_SCATTER_CHART:
            var chart = new google.visualization.ScatterChart(elmnt);
            chart.draw(data, options)
            break
        case DIAGRAM_AREA_CHART:
            var chart = new google.visualization.AreaChart(elmnt);
            chart.draw(data, options)
            break
        case DIAGRAM_BUBBLE_CHART:
            var chart = new google.visualization.BubbleChart(elmnt);
            chart.draw(data, options)
            break
        case DIAGRAM_CHOROPLETH_MAP:
            var chart = new google.visualization.GeoChart(elmnt);
            chart.draw(data, options)
            break
        case DIAGRAM_HISTOGRAM:
            var chart = new google.visualization.Histogram(elmnt);
            chart.draw(data, options)
            break
        case DIAGRAM_TREE_MAP:
            var tree = new google.visualization.TreeMap(elmnt);
            tree.draw(data, options)
            break
        default:
            var table = new google.visualization.Table(elmnt);
            table.draw(data, {showRowNumber: true, width: '100%', height: '100%', page: 'enable'});
    }
}