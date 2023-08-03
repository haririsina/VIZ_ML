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

    if diagram_name == Chart.DENSITY_CHART.value:
        return plot_density_chart(dataset, target, variables)

    if diagram_name == Chart.BUBBLE_CHART.value:
        return plot_bubble_chart(dataset, target, variables)
    
    if diagram_name == Chart.SCATTER_CHART.value:
        return plot_scatter_chart(dataset, target, variables)
    
    if diagram_name == Chart.SCATTER_MATRIX_CHART.value:
        return plot_scatter_matrix_chart(dataset, target, variables)
    
    if diagram_name == Chart.PARALLEL_COORDINATES_CHART.value:
        return plot_parallel_coordinates_chart(dataset, target, variables)

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


def plot_density_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    # Get the latitude, longitude, and density values from the chosen columns
    latitude_values = df[variables[0]].values
    longitude_values = df[variables[1]].values
    density_values = df[target].values

    # Create the trace for the density map
    trace = go.Densitymapbox(
        lat=latitude_values,
        lon=longitude_values,
        z=density_values,
        radius=10,
        hoverinfo='text',
        text=df[target]
    )

    # Create the layout for the map
    layout = go.Layout(
        title='Density Map',
        mapbox=dict(
            style='stamen-terrain',  # You can choose other map styles as well
            center=dict(
                lat=latitude_values.mean(),
                lon=longitude_values.mean()
            ),
            zoom=10
        )
    )

    # Create the figure with the trace and layout
    fig = go.Figure(data=[trace], layout=layout)

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_bubble_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    # Get the X, Y, and bubble sizes from the chosen columns
    x_values = df[variables[0]].values
    y_values = df[variables[1]].values
    bubble_sizes = df[target].values

    # Create the trace for the bubble chart
    trace = go.Scatter(
        x=x_values,
        y=y_values,
        mode='markers',
        marker=dict(
            size=bubble_sizes,
            sizemode='diameter',
            sizeref=max(bubble_sizes) / 30,  # Adjust the scaling of bubble size here
            opacity=0.7
        ),
        hoverinfo='text',
    )

    # Create the layout for the chart
    layout = go.Layout(
        title='Bubble Chart',
        xaxis=dict(title=variables[0]),
        yaxis=dict(title=variables[1]),
        hovermode='closest'
    )

    # Create the figure with the trace and layout
    fig = go.Figure(data=[trace], layout=layout)
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_scatter_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.scatter(
        data_frame=df,
        x=variables[0],
        y=variables[1],
        color=target,
        symbol=target
    )
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_scatter_matrix_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    fig = px.scatter_matrix(
        data_frame=df, 
        dimensions=variables if len(variables) > 1 else None, 
        color=target if target != "" else None
    )

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_parallel_coordinates_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.parallel_coordinates(
        data_frame=df, 
        color=target,
        dimensions=variables,
        color_continuous_scale=px.colors.diverging.Tealrose,
        color_continuous_midpoint=2
    )

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name