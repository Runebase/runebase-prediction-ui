import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { Button, Grid, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import cx from 'classnames';
import { sum } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EventWarning from '../../../../../components/EventWarning';
import styles from './styles';


@injectIntl
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
  

  render() {
    const { classes, index } = this.props;
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
                <Button>
                    Cancel
                </Button>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
