import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, store, store: { exchange } } = this.props;
    const { createEvent } = store;

    return (
      <Grid container className={classes.dashboardOrderBookWrapper}>
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
