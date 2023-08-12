from .enums import *
import plotly.express as px
import pandas as pd
import uuid, numpy
import plotly.graph_objects as go
from io import StringIO


def pen(diagram_name, dataset, target, variables) -> str:
    if dataset.startswith("ï»¿"):
        dataset = dataset.replace("ï»¿", "")

    if diagram_name == Chart.LINE_CHART.value or diagram_name == Chart.STACKED_LINE_CHART.value:
        return plot_line_chart(dataset, target, variables)

    if diagram_name == Chart.AREA_CHART.value or diagram_name == Chart.STACKED_AREA_CHART.value:
        return plot_area_chart(dataset, target, variables)

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

    if diagram_name == Chart.BAR_CHART.value:
        return plot_bar_chart(dataset, target, variables)

    if diagram_name == Chart.STACKED_BAR_CHART.value:
        return plot_stacked_bar_chart(dataset, target, variables)

    if diagram_name == Chart.TABLE_CHART.value:
        return plot_table_chart(dataset, target, variables)

    if diagram_name == Chart.TREEMAP_CHART.value:
        return plot_treemap_chart(dataset, target, variables)

    if diagram_name == Chart.HISTOGRAM_CHART.value:
        return plot_histogram_chart(dataset, variables)

    if diagram_name == Chart.RADAR_CHART.value:
        return plot_radar_chart(dataset, target, variables)

    if diagram_name == Chart.CLUSTERED_BAR_CHART.value:
        return plot_stacked_bar_chart(dataset, target, variables, barmode='group')

    if diagram_name == Chart.PIE_CHART.value:
        return plot_pie_chart(dataset, target, variables)

    if diagram_name == Chart.NETWORK_CHART.value:
        return plot_network_chart(dataset, variables)


def plot_pie_chart(dataset, target, variables) -> str:
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.pie(df, values=target, names=variables[0])
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_line_chart(dataset, target, variables) -> str:
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.line(data_frame=df, x=variables[0], y=target, color=variables[1] if len(variables) > 1 else None)
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_area_chart(dataset, target, variables) -> str:
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    fig = px.area(df, x=variables[0], y=target, color=variables[1] if len(variables) > 1 else None)

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_dot_line_chart(dataset, target, variables) -> str:
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    # df.sort_values(by=variables +[target], inplace=True)

    fig = px.line(df, x=variables[0], y=target, color=variables[1] if len(variables) > 1 else None, markers=True)
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_heat_map_chart(dataset, target, variables) -> str:
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    # Get values (z-axis) from the chosen column
    z_values = df[variables[1]].values

    # Create the trace for the heatmap
    trace = go.Heatmap(
        x=df[variables[0]],
        y=df[target],
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


def plot_density_chart(dataset, target, variables) -> str:
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


def plot_bubble_chart(dataset, target, variables) -> str:
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
        y=target,
        color=variables[1] if len(variables) > 1 else None,
        symbol=variables[1] if len(variables) > 1 else None
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


def plot_bar_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.bar(
        df,
        x=variables[0],
        y=target
    )

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_stacked_bar_chart(dataset, target, variables, barmode=None):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.bar(
        df,
        x=variables[0],
        y=target,
        color=variables[1],
        barmode=barmode if barmode is not None else None
    )

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_table_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    table_header = dict(values=variables + [target])
    table_cells = []

    for v in variables:
        table_cells.append(df[v].values)

    table_cells.append(df[target].values)

    fig = go.Figure(
        data=[
            go.Table(
                header=table_header,
                cells=dict(values=table_cells)
            )
        ]
    )

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_treemap_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")

    variables.insert(0, px.Constant(""))
    values = variables.pop()

    fig = px.treemap(
        df,
        path=variables,
        values=values,
        color=target
    )
    fig.update_layout(margin=dict(t=50, l=25, r=25, b=25))

    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_histogram_chart(dataset, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.histogram(df, x=variables[0], color=variables[1] if len(variables) > 1 else None)
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_radar_chart(dataset, target, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.line_polar(df, r=target, theta=variables[0])
    fig.update_traces(fill='toself')
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name


def plot_network_chart(dataset, variables):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",", na_filter = False)

    nodes = {}
    for i in range(len(df[variables[2]].values)):
        if df[variables[2]].values[i] == "":
            continue

        nodes[str(i)] = (df[variables[3]].values[i], df[variables[4]].values[i])

    edges = []
    for i in range(len(df[variables[0]].values)):
        if df[variables[0]].values[i] == "":
            continue

        edges.append((
            df[variables[0]].values[i],
            df[variables[1]].values[i]
        ))

    edge_x = []
    edge_y = []
    for edge in edges:
        x0, y0 = nodes[str(edge[0])]
        x1, y1 = nodes[str(edge[1])]
        edge_x.append(x0)
        edge_x.append(x1)
        edge_x.append(None)
        edge_y.append(y0)
        edge_y.append(y1)
        edge_y.append(None)

    edge_trace = go.Scatter(
        x=edge_x, y=edge_y,
        line=dict(width=0.5, color='#888'),
        hoverinfo='none',
        mode='lines'
    )

    fig = go.Figure(data=[edge_trace],
             layout=go.Layout(
                title='<br>Network graph made with Python',
                titlefont_size=16,
                showlegend=False,
                hovermode='closest',
                margin=dict(b=20,l=5,r=5,t=40),
                annotations=[ dict(
                    text="Python code: <a href='https://plotly.com/ipython-notebooks/network-graphs/'> https://plotly.com/ipython-notebooks/network-graphs/</a>",
                    showarrow=False,
                    xref="paper", yref="paper",
                    x=0.005, y=-0.002 ) ],
                xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                yaxis=dict(showgrid=False, zeroline=False, showticklabels=False))
                )
    
    node_x = []
    node_y = []
    for node in nodes.keys():
        x, y = nodes[node]
        node_x.append(x)
        node_y.append(y)

    node_trace = go.Scatter(
        x=node_x, y=node_y,
        mode='markers',
        hoverinfo='text',
        marker=dict(
            showscale=True,
            colorscale='YlGnBu',
            reversescale=True,
            color=[],
            size=10,
            colorbar=dict(
                thickness=15,
                title='Node Connections',
                xanchor='left',
                titleside='right'
            ),
            line_width=2))

    node_text = []
    for node in nodes.keys():
        node_text.append(node)

    node_trace.text = node_text

    fig = go.Figure(data=[edge_trace, node_trace],
                layout=go.Layout(
                    title='<br>Network graph made with Python',
                    titlefont_size=16,
                    showlegend=False,
                    hovermode='closest',
                    margin=dict(b=20,l=5,r=5,t=40),
                    annotations=[ dict(
                        text="Python code: <a href='https://plotly.com/ipython-notebooks/network-graphs/'> https://plotly.com/ipython-notebooks/network-graphs/</a>",
                        showarrow=False,
                        xref="paper", yref="paper",
                        x=0.005, y=-0.002 ) ],
                    xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                    yaxis=dict(showgrid=False, zeroline=False, showticklabels=False))
                )
    
    
    file_name = f"{uuid.uuid4()}.html"
    fig.write_html(f"media/{file_name}")
    return file_name