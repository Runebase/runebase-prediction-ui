import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { getMarkets } from './Utils';


@injectIntl
@inject('store')
@observer
export default class Markets extends Component {
  constructor() {
    super();
    this.state = {
      data: getMarkets(),
    };
  }

  render() {
    const { data } = this.state;
    const { store } = this.props;
    return (
      <ReactTable
        getTdProps={(state, rowInfo, column ) => ({
          onClick: (e) => {
            e.preventDefault();
            if(rowInfo){
              const market = rowInfo.original.id;
              this.props.store.wallet.changeMarket(market, this.props.store.wallet.addresses);  
            }
          },
        })}
        data={data}
        filterable
        columns={[
          {
            columns: [
              {
                Header: 'Favorite',
                accessor: 'favorite',
                Width: 50,
                id: 'favorite',
                Cell: ({ value }) => (value >= 1 ? 'true' : 'false'),
                filterMethod: (filter, row) => {
                  if (filter.value === 'all') {
                    return true;
                  }
                  if (filter.value === 'true') {
                    return row[filter.id] >= 1;
                  }
                  return row[filter.id] < 1;
                },
                Filter: ({ filter, onChange }) =>
                  (<select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: '100%' }}
                    value={filter ? filter.value : 'all'}
                  >
                    <option value='all'>Show All</option>
                    <option value='true'>Favorite</option>
                    <option value='false'>Cant Drink</option>
                  </select>),
              },
              {
                Header: 'token',
                accessor: 'token',
                Width: 150,
                filterMethod: (filter, row, column) => {
                  const id = filter.pivotId || filter.id;
                  return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
                },
              },
              {
                Header: 'Price',
                id: 'price',
                filterable:false,
                minWidth: 50,
              },
              {
                Header: 'volume',
                id: 'volume',
                filterable:false,
                minWidth: 50,
              },
              {
                Header: 'Chg',
                accessor: 'chg',
                filterable:false,
                minWidth: 50,
              },
              {
                Header: 'Name',
                accessor: 'name',
                filterable:false,
                minWidth: 150,
              },
            ],
          },
        ]}
        className='-striped -highlight'
      />
    );
  }
}
