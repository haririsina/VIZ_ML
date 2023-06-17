const preview_diagram_line_chart = document.querySelector("#preview_diagram_line_chart")
const preview_diagram_scatter_plot = document.querySelector("#preview_diagram_scatter_plot")
const preview_diagram_bubble_chart = document.querySelector("#preview_diagram_bubble_chart")
const preview_diagram_bar_chart = document.querySelector("#preview_diagram_bar_chart")
const preview_diagram_table = document.querySelector("#preview_diagram_table")
const preview_diagram_pie_chart = document.querySelector("#preview_diagram_pie_chart")
const preview_diagram_choropleth_map = document.querySelector("#preview_diagram_choropleth_map")
const preview_diagram_histogram = document.querySelector("#preview_diagram_histogram")
const preview_diagram_tree_map = document.querySelector("#preview_diagram_tree_map")
const preview_diagram_area_chart = document.querySelector("#preview_diagram_area_chart")


google.charts.load('50', { packages: ['corechart', 'table', 'geochart', 'treemap'] });
google.charts.setOnLoadCallback(() => {

    let options = {
        width: 290,
        region: 'IR',
        curveType: 'function',
        hAxis: { textPosition: 'none' },
        vAxis: { textPosition: 'none' },
        backgroundColor: "#ecf0f1",
        annotations: {
            textStyle: {
                opacity: 0
            }
        },
        colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
        colors: ["#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"]
    }

    let data = [['', ''], [0, 0], [3, 7], [6, 4], [8, 9]]

    draw_chart(
        data, DIAGRAM_LINE_CHART, preview_diagram_line_chart, options
    )

    draw_chart(
        data, DIAGRAM_SCATTER_CHART, preview_diagram_scatter_plot, options
    )

    draw_chart(
        data, DIAGRAM_BAR_CHART, preview_diagram_bar_chart, options
    )

    draw_chart(
        data, DIAGRAM_AREA_CHART, preview_diagram_area_chart, options
    )

    data = [['a', 'b', 'c'], [0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3], [1, 1, 1], [2, 2, 2], [3, 3, 3]]

    draw_chart(
        data, DIAGRAM_TABLE, preview_diagram_table, options
    )

    data = [['', ''], ['', 0], ['', 2.1], ['', 3.4], ['', 5.6]]

    draw_chart(
        data, DIAGRAM_HISTOGRAM, preview_diagram_histogram, options
    )

    data = [['', ''], ['0', 0,], ['3', 7], ['6', 4], ['8', 9]]

    draw_chart(
        data, DIAGRAM_PIE_CHART, preview_diagram_pie_chart, options
    )

    data = [['', '', ''], ['0', 0, 0], ['3', 1, 2], ['6', 3, 1], ['8', 4, 3]]

    draw_chart(
        data, DIAGRAM_BUBBLE_CHART, preview_diagram_bubble_chart, options
    )

    data = [
        ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
        ['A',    null,                 0,                               0],
        ['B',   'A',             0,                               0],
        ['C',    'A',             0,                               0],
        ['D',      'A',             0,                               0],
        ['Brazil',    'B',            11,                              10],
        ['Canada',    'B',            16,                              -23],
        ['Italy',     'C',             17,                              4],
        ['UK',        'C',             21,                              -5],
        ['China',     'D',               36,                              4],
    ]

    draw_chart(
        data, DIAGRAM_TREE_MAP, preview_diagram_tree_map, options
    )

});