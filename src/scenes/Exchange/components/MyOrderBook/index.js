import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';
import theme from '../../../../config/theme';
import InfiniteScroll from '../../../../components/InfiniteScroll';
import _Loading from '../../../../components/Loading';
import OrderBook from './OrderBook';
import styles from './styles';


const messages = defineMessages({
  loadAllNewOrdersMsg: {
    id: 'load.allNewOrders',
    defaultMessage: 'loading',
  },
});

@inject('store')
@observer
@withStyles(styles, { withTheme: true })
export default class MyOrderBook extends Component {

  componentDidMount() {
    this.props.store.allNewOrders.init();
  }

  render() {
    const { classes } = this.props;
    const { allNewOrders } = this.props.store;
    return (
      <Fragment>
        <Card className={classes.dashboardOrderBookTitle}>
          <p>My Open Orders</p>
        </Card>
        <Events allNewOrders={allNewOrders} />
      </Fragment>
    );
  }
}

const Events = observer(({ allNewOrders: { list, loadMore, loading, loadingMore } }) => {
  if (loading) return <Loading />;
  const newOrders = (list || []).map((event, i) => <OrderBook key={i} index={i} event={event} />); // eslint-disable-line
  return (
    newOrders
  );
});

const Loading = withStyles(styles)(({ classes }) => <Row><_Loading className={classes.loading} text={messages.loadAllNewOrdersMsg} /></Row>);

const Row = withStyles(styles)(({ classes, ...props }) => (
  <div className={classes.row} {...props} />
));
