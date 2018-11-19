import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Chart from './Chart';

@inject('store')
@observer
export default class ChartComponent extends Component {
  render() {
    const { store: { priceChartStore } } = this.props;
    if (priceChartStore.chartInfo == null) {
      return <div>Loading...</div>;
    }
    return (
      <Chart type='SVG' data={priceChartStore.chartInfo} />
    );
  }
}
