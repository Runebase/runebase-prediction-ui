import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { Button, Grid, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import cx from 'classnames';
import { sum } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelOrderTxConfirmDialog from '../CancelOrderTxConfirmDialog';

import EventWarning from '../../../../../components/EventWarning';
import styles from './styles';

const messages = defineMessages({
  cancelOrderConfirmMsgSendMsg: {
    id: 'redeemConfirmMsg.send',
    defaultMessage: 'send to address {address}',
  },
});

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
export default class EventCard extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired, // eslint-disable-line react/no-typos
    index: PropTypes.number.isRequired,
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };
  constructor(props) {
    super(props);
    this.state = { open:1 };
  }
  onCancelOrder = () => {
    this.setState({
      open: 0,
    });
  }

  render() {
    console.log(this.state.open);
    const { classes, index, store: { wallet }  } = this.props;
    const { orderId, txid, buyToken, sellToken, amount, owner, blockNum, time, priceDiv, priceMul } = this.props.event;
    const { locale, messages: localeMessages, formatMessage } = this.props.intl;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <Grid container> 
                <Grid item xs={3}>
                  <p>orderId</p>
                  <p>{orderId}</p>
                </Grid>
                <Grid item xs={7}>
                  <p>owner</p>
                  <p>{owner}</p> 
                </Grid>
              </Grid>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.dashboardOrderBookWrapper}>
            <Typography>
              <p>buyToken: {buyToken}</p>
              <p>sellToken: {sellToken}</p>
              <p>priceMul: {priceMul}</p>
              <p>priceDiv: {priceDiv}</p>
              <p>amount: {amount}</p>
              <Grid container>
                <Grid item xs={6}>
                  <p>created time: {time}</p>
                </Grid>
                <Grid item xs={6}>
                  <p>created blockNum: {blockNum}</p>
                </Grid>
              </Grid>
              <div>
                <Button onClick={ () =>  wallet.prepareCancelOrderExchange(orderId) } color="primary">
                  Cancel
                </Button>
                <CancelOrderTxConfirmDialog onCancelOrder={this.onCancelOrder} id={messages.cancelOrderConfirmMsgSendMsg.id} />
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
