import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';

import theme from '../../../../config/theme';
import OrderBook from './OrderBook';
import _Loading from '../../../../components/Loading';
import styles from './styles';


const messages = defineMessages({
  loadAllEventsMsg: {
    id: 'load.allEvents',
    defaultMessage: 'loading',
  },
});

@inject('store')
@observer
@withStyles(styles, { withTheme: true })
export default class BuyBook extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isButtonDisabledPrev: this.props.store.buyStore.hasLess,
      isButtonDisabledNext: this.props.store.buyStore.hasMore,
    };
  }
  componentDidMount() {
    this.props.store.buyStore.init();

  }

  handleNext = async () => {
    this.props.store.buyStore.skip = this.props.store.buyStore.skip + 10;
    await this.props.store.buyStore.getBuyOrderInfo();
    this.setState({
      isButtonDisabledPrev: this.props.store.buyStore.hasLess,
      isButtonDisabledNext: this.props.store.buyStore.hasMore,
    });
  }
  handlePrevious = async () => {    
    this.props.store.buyStore.skip = this.props.store.buyStore.skip - 10;
    await this.props.store.buyStore.getBuyOrderInfo();
    this.setState({
      isButtonDisabledPrev: this.props.store.buyStore.hasLess,
      isButtonDisabledNext: this.props.store.buyStore.hasMore,
    });
  }
  
  render() {
    const { classes } = this.props;
    const { buyStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className={classes.dashboardOrderBookTitle}>
          <p>People Buying {wallet.market}</p>
        </Card>
        <Events buyStore={buyStore} />
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

const Events = observer(({ buyStore: { buyOrderInfo, loadMoreEvents, loading, loadingMore } }) => {
  if (loading) return <Loading />;
  const events = (buyOrderInfo || []).map((event, i) => <OrderBook key={i} index={i} event={event} />); // eslint-disable-line
  return (
    events
  );
});

const Loading = withStyles(styles)(({ classes }) => <Row><_Loading className={classes.loading} text={messages.loadAllEventsMsg} /></Row>);

const Row = withStyles(styles)(({ classes, ...props }) => (
  <div className={classes.row} {...props} />
));
