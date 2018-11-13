import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';
import _Loading from '../../../../components/Loading';
import MyTradesView from './MyTradesView';
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
export default class MyTrades extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isButtonDisabledPrev: this.props.store.myTradeStore.hasLess,
      isButtonDisabledNext: this.props.store.myTradeStore.hasMore,
    };
  }
  componentDidMount() {
    this.props.store.myTradeStore.init();
  }
  handleNext = async () => {
    this.props.store.myTradeStore.skip = this.props.store.myTradeStore.skip + 10;
    await this.props.store.myTradeStore.getMyTradeInfo();
    this.setState({
      isButtonDisabledPrev: this.props.store.myTradeStore.hasLess,
      isButtonDisabledNext: this.props.store.myTradeStore.hasMore,
    });
  }
  handlePrevious = async () => {
    this.props.store.myTradeStore.skip = this.props.store.myTradeStore.skip - 10;
    await this.props.store.myTradeStore.getMyTradeInfo();
    this.setState({
      isButtonDisabledPrev: this.props.store.myTradeStore.hasLess,
      isButtonDisabledNext: this.props.store.myTradeStore.hasMore,
    });
  }

  render() {
    const { classes } = this.props;
    const { myTradeStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className={classes.dashboardOrderBookTitle}>
          <p>My Trades</p>
        </Card>
        <Trades myTradeStore={myTradeStore} />
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

const Trades = observer(({ myTradeStore: { myTradeInfo } }) => {
  const myTrades = (myTradeInfo || []).map((event, i) => <MyTradesView key={i} index={i} event={event} />); // eslint-disable-line
  return (
    myTrades
  );
});

