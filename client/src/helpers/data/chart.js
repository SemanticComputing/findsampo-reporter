/**
 * This files contains helper functions for creating charts
 */

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3', '#607D8B',
  '#CDDC39', '#FF1744', '#3F51B5', '#FF6D00', '#9e9e9e', '#b0bec5', '#ffeb3b', '#0288d1', '#673ab7',
  '#ec407a', '#cddc39', '#3f51b5', '#aa00ff', '#b3e5fc', '#ffeb3b', '#a7ffeb', '#1a237e'];

/**
 * Generates options for a pie chart
 * 
 * @param {labels} labels 
 * @param {series} series 
 */
export const createPieChartOptions = (labels, series) => {
  return {
    chart: {
      type: 'pie'
    },
    legend: {
      position: 'bottom'
    },
    labels,
    series,
    colors
  };
};

/**
 * Generates options for a donut chart
 * 
 * @param {labels} labels 
 * @param {series} series 
 */
export const createDonutOptions = (labels, series) => {
  return {
    chart: {
      type: 'donut',
    },
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true
            },
            value: {
              show: true
            },
            total: {
              show: true
            }
          }
        }
      }
    },
    labels,
    series,
    colors
  };
};

/**
 * Generates options for a radial bar
 * 
 * @param {labels} labels 
 * @param {series} series 
 */
export const createRadialBarChartOptions = (labels, series) => {
  return {
    chart: {
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        offsetY: -10,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,

          },
          value: {
            show: false,
          }
        }
      }
    },
    colors,
    series,
    labels,
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'bottom',
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        horizontal: 1,
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          show: false
        }
      }
    }]
  };
};

/**
 * Generates options for a bar chart
 * 
 * @param {labels} labels 
 * @param {values} values 
 */
export const createBarChartOptions = (labels, values) => {
  return {
    chart: {
      width: '100%',
      type: 'bar'
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        barHeight: '75%',
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#000']
      },
      formatter: function (val, opt) {
        return labels[opt.dataPointIndex];
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    colors: colors,
    series: [{
      data: values
    }],
    states: {
      normal: {
        filter: {
          type: 'desaturate'
        }
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'darken',
          value: 1
        }
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (val, opts) {
            return labels[opts.dataPointIndex] + ' : ' + val;
          }
        }
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
  };
};