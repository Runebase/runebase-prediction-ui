import React, { Component } from 'react';
import { render } from 'react-dom';
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from './Chart';
import { getData } from "./utils";

export default class ChartComponent extends Component {
  componentDidMount() {
    getData().then(data => {
      this.setState({ data });
    });
  }
  /* Create reaction on blocksync get new TSV file */
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <Chart type='SVG' data={this.state.data} />   
    );
  }
}
