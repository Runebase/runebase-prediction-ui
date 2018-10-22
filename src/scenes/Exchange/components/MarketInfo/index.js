import React, { Component } from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { inject, observer } from 'mobx-react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import Deposit from './Deposit';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class MarketInfo extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      market: 'a',
      addresslist: [],
    };
    this.props.store.wallet.changeMarket('PRED', this.props.store.wallet.addresses);
  }
  handleSelectChange = (event) => {
    this.props.store.wallet.changeAddress(event);
  }
  render() {
    const {
      depositDialogVisible,
    } = this.state;
    const { classes, store, store: { wallet } } = this.props;
    const stylist = {
      heightRow: {
        height: 75,
      },
    };
    this.state.market = this.props.store.wallet.market;
    this.state.addresslist = this.props.store.wallet.addressList;
    console.log('vlah');
    console.log(this.props.store.wallet.currentAddresses);
    return (
      <withStyles>        
        <Grid container>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12} style={stylist.heightRow}>
                <Deposit />                
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <p>Desposit</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs={12}>
                <select onChange={this.handleSelectChange}>
                  <option>Please Select Your Address</option>
                  {this.props.store.wallet.currentAddresses.map((addressData) =>
                    <option 
                      key={addressData[0]}
                      runes={addressData[3]}
                      token={addressData[2]}
                      address={addressData[0]}
                    > 
                      {addressData[0]} | {addressData[2]} {this.props.store.wallet.market} | {addressData[3]} RUNES
                    </option> 
                  )
                  }
                </select> 
              </Grid>
            </Grid>
            <Grid cointainer>
              <Grid item xs={12}>
                <withStyles>
                  RUNES balance of selected address:
                  {this.props.store.wallet.currentAddressBalanceRunes}
                </withStyles>
              </Grid>
              <Grid item xs={12}>
                <withStyles>{this.props.store.wallet.market} balance of selected address: {this.props.store.wallet.currentAddressBalanceToken}</withStyles>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid cointainer>
          <Grid item xs={12}>
            <withStyles>{this.state.market}/RUNES</withStyles>
          </Grid>
          <Grid item xs={12}>
            <withStyles>Contract Address: {this.props.store.wallet.currentMarketContract}</withStyles>
          </Grid>
        </Grid>
      </withStyles>
    );
  }  
}
