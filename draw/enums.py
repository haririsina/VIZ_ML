from enum import Enum


class Chart(Enum):
    LINE_CHART = "Line Chart"
    STACKED_LINE_CHART = "Stacked Line Chart"
    AREA_CHART = "Area Chart"
    STACKED_AREA_CHART = "Stacked Line Chart"
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7