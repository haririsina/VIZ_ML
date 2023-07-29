from .enums import *
import plotly.express as px
import pandas as pd
import sys
import plotly.graph_objects as go
from io import StringIO


def pen(diagram_name, dataset, target, variables):
    if diagram_name == Chart.LINE_CHART.value:
        plot_line_chart(dataset, target, variables)

    if diagram_name == Chart.STACKED_LINE_CHART.value:
        plot_stacked_line_chart(dataset, target, variables)

    if diagram_name == Chart.AREA_CHART or diagram_name == Chart.STACKED_AREA_CHART:
        plot_stacked_area_chart(dataset, target, variables)


def plot_line_chart(dataset, target, variables, ):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.line(data_frame=df, x=variables[0], y=target)
    fig.show()


def plot_stacked_line_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.line(data_frame=df, x=variables[0], y=variables[1], color=target)
    fig.show()


def plot_stacked_area_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    # Create the traces for the stacked line chart
    traces = []
    for variable in variables:
        trace = go.Scatter(
            x=df[target],
            y=df[variable],
            mode='lines',
            stackgroup='one',
            name=""
        )
        traces.append(trace)

    # Create the layout for the chart
    layout = go.Layout(
        title='Stacked Line Chart',
        xaxis=dict(title=target),
        yaxis=dict(title='Value'),
        hovermode='closest'
    )

    # Create the figure with the traces and layout
    fig = go.Figure(data=traces, layout=layout)

    # Display the chart
    fig.show()
