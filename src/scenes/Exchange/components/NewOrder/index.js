import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';

import {
  Grid,
  FormLabel,
  InputLabel,
  Card,
  withStyles,
} from '@material-ui/core';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';

import styles from './styles';

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
    console.log("handle submit");
    const data = new FormData(form);

    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }

  render() {

    const { classes, store: { wallet } } = this.props;
    const market = this.props.store.wallet.currentMarket.toLowerCase();
    console.log(market);
    return (      
      <Grid item xs={6}>
        <Card className={classes.dashboardOrderBookTitle}>
          <p>Buy {this.props.store.wallet.currentMarket}</p>
        </Card>
        <Card className={classes.dashboardOrderBook}>
          <Grid container className={classes.dashboardOrderBookWrapper}>
            <Grid item xs={12}>
              <Form className={classes.tokenSelect} onSubmit={this.handleSubmit}>
                <Select className={classes.tokenSelect} onChange={this.tokenChange} value={this.state.token}>
                  <option className={classes.tokenOption} value="PRED">PRED</option>
                  <option className={classes.tokenOption} value="FUN">FUN</option>
                </Select>
                <h3>{this.props.store.wallet.currentMarket}/RUNES</h3>
                <h3>{this.props.store.wallet.currentTokenAmount}</h3>
                <Grid container>
                  <Grid item xs={6}>
                    <InputLabel className={classes.orderLabel}>
                        Amount:
                    </InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Input type="number" step="0.1" value={this.state.amount} onChange={this.changeAmount} name="amount" />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <FormLabel className={classes.orderLabel}>
                        Price:
                    </FormLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Input type="number" step="0.1" value={this.state.price} onChange={this.changePrice} name="price" />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <FormLabel className={classes.orderLabel}>
                        Total:
                    </FormLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Input type="number" step="0.1" value={this.state.total} name="total" />
                  </Grid>
                </Grid>
                <input type="submit" value={this.state.orderType} />
                <button>Send data!</button>
              </Form>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}
