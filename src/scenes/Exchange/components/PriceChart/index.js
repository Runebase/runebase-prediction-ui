import React, { Component } from 'react';
import { render } from 'react-dom';
import { inject, observer } from 'mobx-react';
import Chart from './Chart';


@inject('store')
@observer
export default class ChartComponent extends Component {
  /* Create reaction on blocksync get new TSV file */
  render() {
    const { store: { priceChartStore } } = this.props;
    if (priceChartStore.chartInfo == null) {
      return <div>Loading...</div>;
    }
    return (
      <Chart type='SVG' data={ priceChartStore.chartInfo } />   
    );
  }
}
