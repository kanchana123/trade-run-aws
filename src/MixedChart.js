import React from 'react'
import Chart from 'react-apexcharts'
import data from './data.json'

export default class MixedChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'TEAM A',
          type: 'candlestick',
          data: [[23, 21, 20, 15], [11, 22, 27, 13], [22, 27, 13, 22], [27, 13, 22, 37], [13, 22, 37, 21], [22, 37, 21, 44], [37, 21, 44, 22], [21, 44, 22, 30], [44, 44, 22, 30], [22, 44, 22, 30], [30, 44, 22, 30]]
        }, {
          name: 'TEAM B',
          type: 'area',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        }, {
          name: 'TEAM C',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            stacked: false,
          },
          stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
          },
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          },
          
          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
            }
          },
          labels: [new Date('01/01/2003'), new Date('02/01/2003'), new Date('03/01/2003'), 
            new Date('04/01/2003'), new Date('05/01/2003'), new Date('06/01/2003'), new Date('07/01/2003'),
            new Date('08/01/2003'), new Date('09/01/2003'), new Date('10/01/2003'), new Date('11/01/2003')
          ],
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            title: {
              text: 'Points',
            },
            min: 0
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " points";
                }
                return y;
          
              }
            }
          }
        },
      
      
      };
    }

  

    render() {
      return (
        <div id="chart">
            <Chart options={this.state.options} series={this.state.series} height={350} />
        </div>
      );
    }
  }