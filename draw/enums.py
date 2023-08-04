from enum import Enum


class Chart(Enum):
    LINE_CHART = "Line Chart"
    STACKED_LINE_CHART = "Stacked Line Chart"
    AREA_CHART = "Area Chart"
    STACKED_AREA_CHART = "Stacked Area Chart"
    DOT_LINE_CHART = "Dot Line Chart"
    HEAT_MAP_CHART = "Heat Map Chart"
    DENSITY_CHART = "Density Chart"
    BUBBLE_CHART = "Bubble Chart"
    SCATTER_CHART = "Scatter Plot"
    SCATTER_MATRIX_CHART = "Scatter Plot Matrix"
    PARALLEL_COORDINATES_CHART = "Parallel Coordinates Plot"
    BAR_CHART = "Bar Chart"
    STACKED_BAR_CHART = "Stacked Bar Chart"
    TABLE_CHART = "Table"
    TREEMAP_CHART = "Treemap"
    HISTOGRAM_CHART = "Histogram"