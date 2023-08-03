from enum import Enum


class Chart(Enum):
    LINE_CHART = "Line Chart"
    STACKED_LINE_CHART = "Stacked Line Chart"
    AREA_CHART = "Area Chart"
    STACKED_AREA_CHART = "Stacked Line Chart"
    DOT_LINE_CHART = "Dot Line Chart"
    HEAT_MAP_CHART = "Heat Map Chart"
    DENSITY_CHART = "Density Chart"
    BUBBLE_CHART = "Bubble Chart"
    SCATTER_CHART = "Scatter Plot"