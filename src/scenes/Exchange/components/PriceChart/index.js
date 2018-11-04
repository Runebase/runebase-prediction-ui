import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


@inject('store')
@observer
export default class PriceChart extends Component {  
  constructor(app) {
    super(app);
    this.app = app;
  }
  render() {
    const { chartInfo } = this.props.store.global;

    return (
      <ResponsiveContainer height={300} width="100%">
        <LineChart 
          data={chartInfo}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="date"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
