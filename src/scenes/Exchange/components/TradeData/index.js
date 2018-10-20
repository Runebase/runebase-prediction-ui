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

import { SortBy } from 'constants';
import styles from './styles';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class TradeData extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, noCreateEventButton, fontSize, store, store: { exchange } } = this.props;
    const { createEvent } = store;

    const msg = "H343BuRAQncb6qetTthjp2ygTrOD4CgmUGPBbauNHBRUCoxwtzpROWq02PDUA1zGIF4CCtXKjbj4QfzAYVnRthY=";

    const r = msg.slice(0, 66);
    const s = msg.slice(66, 130);
    const v = msg.slice(130, 132);
    console.log(v);
    console.log(Web3Utils.sha3(r));
    console.log(Web3Utils.sha3("f3cf5095b40898d9e20e0cfad62772c4df2473da"));


    return (
      <Grid container className={classes.dashboardOrderBookWrapper}>
        <Grid item xs={12}>
          <Card className={classes.dashboardOrderBookTitle}>
            <FormattedMessage id="tradedata" defaultMessage="Trade Data" />
          </Card>
          <Card className={classes.dashboardOrderBook}>
            <FormattedMessage id="orderbooksect" defaultMessage="..." />
          </Card>
        </Grid>

      </Grid>
    );
  }
}
