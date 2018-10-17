import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';

import {
  Button,
  Grid,
  FormLabel,
  InputLabel,
  Card,
  withStyles,
} from '@material-ui/core';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

import styles from './styles';
import Balances from '../../../Wallet/Balances';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class NewOrder extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      orderType: 'buy',
      amount: 0,
      price: 0,
      total: 0,
      token: 'PRED',
      balance: _.sumBy(this.props.store.wallet.addresses, ({ pred }) => pred).toFixed(2) || '0.00',
    };
  }
  showBuy = () => {
    this.setState({
      orderType: 'buy',
      price: '',
      amount: '',
    });
  }
  showSell = () => {
    this.setState({
      orderType: 'sell',
      amount: '',
      price: '',
    });
  }
  tokenChange = (event) => {
    switch (event.target.value) {
      case 'PRED':
        this.setState({
          token: event.target.value,
          balance: _.sumBy(this.props.store.wallet.addresses, ({ pred }) => pred).toFixed(2) || '0.00',
        });
        break;
      case 'FUN':
        this.setState({
          token: event.target.value,
          balance: _.sumBy(this.props.store.wallet.addresses, ({ fun }) => fun).toFixed(2) || '0.00',
        });
        break;
      default:
        return 'foo';
    }
  }
  changeAmount = (event) => {
    this.setState({
      amount: event.target.value,
      total: event.target.value * this.state.price,
    });
  }
  changePrice = (event) => {
    this.setState({
      price: event.target.value,
      total: this.state.amount * event.target.value,
    });
  }
  total = () => this.amount * this.price;
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const data = new FormData(form);

    console.log(data);
    console.log(this.props.store.wallet);
    console.log(this.props.store.global);
    console.log(this.props.store);
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }

  render() {
    const { classes, noCreateEventButton, fontSize, store, store: { exchange } } = this.props;
    console.log(this.props.store);
    return (
      <Grid container className={classes.dashboardOrderBookWrapper}>
        <Grid item xs={12}>
          <Card className={classes.dashboardOrderBookTitle}>
            <FormattedMessage id="neworder" defaultMessage="NewOrder" />
          </Card>
          <Card className={classes.dashboardOrderBook}>
            <Grid container className={classes.dashboardOrderBookWrapper}>
              <Grid item xs={6}>
                <Button
                  variant="raised"
                  size="medium"
                  color="primary"
                  className={classes.createBuyButton}
                  onClick={this.showBuy}
                >
                  <AddIcon fontSize={fontSize} />
                  <FormattedMessage id="create.buy" defaultMessage="Buy" />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="raised"
                  size="medium"
                  color="primary"
                  className={classes.createEventButton}
                  onClick={this.showSell}
                >
                  <AddIcon fontSize={fontSize} />
                  <FormattedMessage id="create.sell" defaultMessage="Sell" />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Form className={classes.tokenSelect} onSubmit={this.handleSubmit}>
                  <Select className={classes.tokenSelect} select id="token" onChange={this.tokenChange} value={this.state.token}>
                    <option className={classes.tokenOption} value="PRED">PRED</option>
                    <option className={classes.tokenOption} value="FUN">FUN</option>
                  </Select>
                  <h3>{this.state.token}/RUNES</h3>
                  <h3>{this.state.balance} ok</h3>
                  <Grid container xs={12}>
                    <Grid item xs={6}>
                      <InputLabel className={classes.orderLabel}>
                        Amount:
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <Input root type="number" step="0.1" value={this.state.amount} onChange={this.changeAmount} name="amount" />
                    </Grid>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid item xs={6}>
                      <FormLabel className={classes.orderLabel}>
                        Price:
                      </FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <Input type="number" step="0.1" value={this.state.price} onChange={this.changePrice} name="price" />
                    </Grid>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid item xs={6}>
                      <FormLabel className={classes.orderLabel}>
                        Total:
                      </FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <Input type="number" step="0.1" value={this.state.total} name="total" />
                    </Grid>
                  </Grid>
                  <h3>{this.state.token}</h3>
                  <input type="submit" value={this.state.orderType} />
                  <button>Send data!</button>
                </Form>
              </Grid>
            </Grid>
          </Card>
        </Grid>

      </Grid>
    );
  }
}
