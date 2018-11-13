import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';

import theme from '../../../../config/theme';
import OrderBook from './OrderBook';
import _Loading from '../../../../components/Loading';
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
export default class SellBook extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isButtonDisabledPrev: this.props.store.sellStore.hasLess,
      isButtonDisabledNext: this.props.store.sellStore.hasMore,
    };
  }
  componentDidMount() {
    this.props.store.sellStore.init();
  }
  handleNext = async () => {
    this.props.store.sellStore.skip = this.props.store.sellStore.skip + 10;
    await this.props.store.sellStore.getSellOrderInfo();
    this.setState({
      isButtonDisabledPrev: this.props.store.sellStore.hasLess,
      isButtonDisabledNext: this.props.store.sellStore.hasMore,
    });
  }
  handlePrevious = async () => {
    this.props.store.sellStore.skip = this.props.store.sellStore.skip - 10;
    await this.props.store.sellStore.getSellOrderInfo();
    this.setState({
      isButtonDisabledPrev: this.props.store.sellStore.hasLess,
      isButtonDisabledNext: this.props.store.sellStore.hasMore,
    });
  }

  render() {
    const { classes } = this.props;
    const { sellStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className={classes.dashboardOrderBookTitle}>
          <p>People Selling {wallet.market}</p>
        </Card>
        <SellOrders sellStore={sellStore} />
        <button
          disabled={!this.state.isButtonDisabledPrev} 
          onClick={this.handlePrevious}
        >
          Previous Page
        </button>
        <button 
          onClick={this.handleNext}
          disabled={!this.state.isButtonDisabledNext}
        >
          Next Page
        </button>
      </Fragment>
    );
  }
}

const SellOrders = observer(({ sellStore: { sellOrderInfo, loadMoreEvents, loading, loadingMore } }) => {
  if (loading) return <Loading />;
  const events = (sellOrderInfo || []).map((event, i) => <OrderBook key={i} index={i} event={event} />); // eslint-disable-line
  return (
    events
  );
});

const Loading = withStyles(styles)(({ classes }) => <Row><_Loading className={classes.loading} text={messages.loadAllEventsMsg} /></Row>);

const Row = withStyles(styles)(({ classes, ...props }) => (
  <div className={classes.row} {...props} />
));

