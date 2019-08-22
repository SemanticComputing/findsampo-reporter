import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import { isEqual } from 'lodash';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.chart = new ApexCharts(
      this.chartRef.current,
      this.props.options,
    );
    this.chart.render();
  }

  componentDidUpdate(prevProps) {
    // Rerender chart when the props changes
    if (!isEqual(this.props.options, prevProps.options)) {
      this.rerenderChart();
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div className="chart-container">
        <div className="chart-container__chart" ref={this.chartRef} />
      </div>
    );
  }

  /**
   * Helper method for rerendering a chart
   */
  rerenderChart = () => {
    // Destroy the previous chart
    this.chart.destroy();
    // Create a new chart
    this.chart = new ApexCharts(
      this.chartRef.current,
      this.props.options,
    );
    // Render it
    this.chart.render();
  }
}

export default Chart;
