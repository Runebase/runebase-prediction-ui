import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';

const data = [
  [
    {
      type: 'string',
      id: 'Date',
    },
    {
      type: 'number',
      label: 'Something',
    },
    {
      type: 'number',
      label: 'Something',
    },
    {
      type: 'number',
      label: 'Something',
    },
    {
      type: 'number',
      label: 'Something',
    },
  ],
  ['Mon', 0, 0, 38, 45],
  ['Tue', 31, 38, 55, 66],
  ['Wed', 50, 55, 77, 80],
  ['Thu', 77, 77, 66, 50],
  ['Fri', 68, 66, 22, 15],
  ['Mon', 0, 0, 38, 45],
  ['Tue', 31, 38, 55, 66],
  ['Wed', 50, 55, 77, 80],
  ['Thu', 77, 77, 66, 50],
  ['Fri', 68, 66, 22, 15],
];
export default class PriceChart extends Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="CandlestickChart"
          width="100%"
          height="400px"
          data={data}
        />
      </div>
    );
  }
}
