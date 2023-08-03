from .enums import *
import plotly.express as px
import pandas as pd
import uuid
import plotly.graph_objects as go
from io import StringIO


def pen(diagram_name, dataset, target, variables) -> str:
    if diagram_name == Chart.LINE_CHART.value:
        return plot_line_chart(dataset, target, variables)

    if diagram_name == Chart.STACKED_LINE_CHART.value:
        return plot_stacked_line_chart(dataset, target, variables)

    if diagram_name == Chart.AREA_CHART or diagram_name == Chart.STACKED_AREA_CHART:
        return plot_stacked_area_chart(dataset, target, variables)

    if diagram_name == Chart.DOT_LINE_CHART.value:
        return plot_dot_line_chart(dataset, target, variables)

    if diagram_name == Chart.HEAT_MAP_CHART.value:
        return plot_heat_map_chart(dataset, target, variables)


def plot_line_chart(dataset, target, variables) -> str:
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.line(data_frame=df, x=variables[0], y=target)
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_stacked_line_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.line(data_frame=df, x=variables[0], y=variables[1], color=target)
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


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

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_dot_line_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    # Get x-axis label from the chosen column
    x_column = target

    # Get y-axis labels from the chosen columns
    y_columns = variables

    # Sort the values in the chosen x-axis and y-axis columns
    df.sort_values(by=[x_column] + y_columns, inplace=True)

    # Create the traces for the dot and line chart
    traces = []
    for y_column in y_columns:
        trace = go.Scatter(
            x=df[x_column],
            y=df[y_column],
            mode='lines+markers',
            name=y_column
        )
        traces.append(trace)

    # Create the layout for the chart
    layout = go.Layout(
        title='Dot and Line Chart',
        yaxis=dict(title='Value'),
        hovermode='closest'
    )

    # Create the figure with the traces and layout
    fig = go.Figure(data=traces, layout=layout)

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_heat_map_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    # Get x-axis label from the chosen column
    x_column = target

    # Get y-axis label from the chosen column
    y_column = variables[0]

    # Get values (z-axis) from the chosen column
    z_values = df[variables[1]].values

    # Create the trace for the heatmap
    trace = go.Heatmap(
        x=df[x_column],
        y=df[y_column],
        z=z_values,
        colorscale='Viridis',
        zmin=df[variables[1]].min(),
        zmax=df[variables[1]].max()
    )

    # Create the layout for the chart
    layout = go.Layout(
        title='Heatmap',
        hovermode='closest'
    )

    # Create the figure with the trace and layout
    fig = go.Figure(data=[trace], layout=layout)

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name
