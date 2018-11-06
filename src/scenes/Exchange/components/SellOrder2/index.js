import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from 'react-intl';
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
import styles from './styles';
import OrderExchange from './OrderExchange';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class SellOrder extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      price: 0,
      total: 0,
      orderType: 'sell',
    };
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
  
  render() {

    const { classes, store: { wallet } } = this.props;
    const market = this.props.store.wallet.currentMarket.toLowerCase();
    return (      
      <Grid item xs={6}>
        <Card className={classes.dashboardOrderBookTitle}>
          <p>Sell {this.props.store.wallet.currentMarket}</p>
        </Card>
        <Card className={classes.dashboardOrderBook}>
          <Grid container className={classes.dashboardOrderBookWrapper}>
            <Grid item xs={12}>
              <Form className={classes.tokenSelect} onSubmit={this.handleSubmit}>
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
                <OrderExchange {...this.state} />          
              </Form>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}
