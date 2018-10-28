import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { inject, observer } from 'mobx-react';

import {
  Grid,
  Card,
  withStyles,
} from '@material-ui/core';

import styles from './styles';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class OrderBook extends Component {

  render() {
    const { classes, store: { wallet } } = this.props;

    return (
      <Grid container className={styles.marketInfo}>
        <Grid item xs={12}>
          <Card className={classes.dashboardOrderBookTitle}>
            <FormattedMessage id="orderbook" defaultMessage="OrderBook" />
          </Card>
          <Card className={classes.dashboardOrderBook}>
            <FormattedMessage id="orderbooksect" defaultMessage="OrderBook" />
          </Card>
        </Grid>

      </Grid>
    );
  }
}
