import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { inject, observer } from 'mobx-react';
import Web3Utils from 'web3-utils';

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
export default class MyTrades extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, store, store: { exchange } } = this.props;

    return (
      <Grid container className={classes.dashboardOrderBookWrapper}>
        <Grid item xs={12}>
          <Card className={classes.dashboardOrderBookTitle}>
            <FormattedMessage id="myTrade" defaultMessage="My Trades" />
          </Card>
          <Card className={classes.dashboardOrderBook}>
            <FormattedMessage id="myTrades" defaultMessage="..." />
          </Card>
        </Grid>

      </Grid>
    );
  }
}
