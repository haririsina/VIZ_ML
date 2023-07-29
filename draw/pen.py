from .enums import *
import plotly.express as px
import pandas as pd
import sys
from io import StringIO


def pen(diagram_name, dataset, target, variables):
    if diagram_name == Chart.LINE_CHART.value:
        plot_line_chart(dataset, target, variables)


def plot_line_chart(dataset, target, variables, ):
    data = StringIO(dataset)
    df = pd.read_csv(data, sep=",")
    fig = px.line(data_frame=df, x=variables[0], y=target, )
    fig.show()


# def plot_stacked_line_chart(x_values, y_values, labels, x_label, y_label, chart_title, output_file):
#     # Create the traces for the stacked line chart
#     traces = []
#     for i, y in enumerate(y_values):
#         trace = go.Scatter(x=x_values, y=y, mode='lines', name=labels[i])
#         traces.append(trace)
#
#     # Create the layout for the chart
#     layout = go.Layout(
#         title=chart_title,
#         xaxis=dict(title=x_label),
#         yaxis=dict(title=y_label),
#         hovermode='closest'
#     )
#
#     # Create the figure with the traces and layout
#     fig = go.Figure(data=traces, layout=layout)
#
#     # Export the chart as a PNG file
#     pio.write_image(fig, output_file, format='png')
#
#     # Display the chart
#     fig.show()
