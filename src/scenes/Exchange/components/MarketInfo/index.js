import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';

import {
  withStyles,
} from '@material-ui/core';

import styles from './styles';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class TradeData extends Component {
  componentWillMount(){
    const { store: { wallet } } = this.props;
    console.log(this.props.store.wallet.addresses);
    this.props.store.wallet.changeMarket('PRED', this.props.store.wallet.addresses);
  }
  
  render() {
    const { store, store: { wallet } } = this.props;

    const msg = "H343BuRAQncb6qetTthjp2ygTrOD4CgmUGPBbauNHBRUCoxwtzpROWq02PDUA1zGIF4CCtXKjbj4QfzAYVnRthY=";
    const r = msg.slice(0, 66);
    const s = msg.slice(66, 130);
    const v = msg.slice(130, 132);
    console.log(v);
    console.log(s);
    console.log(r);
    console.log(this.props.store.wallet.addresses);

    return (
      <withStyles>       
        <withStyles>{this.props.store.wallet.currentMarket}/RUNES</withStyles>
        <withStyles>Contract Address: {this.props.store.wallet.currentMarketContract}</withStyles>
        <select>
          {this.props.store.wallet.addressList.map((addressData) =>
            <option key={addressData[0]}> {addressData[0]} | {addressData[1]} market | {addressData[2]} token | {addressData[3]} runes</option> 
          )
          }
        </select>
        <withStyles>Deposit {this.props.store.wallet.currentMarket}</withStyles>
        <withStyles>Withdraw {this.props.store.wallet.currentMarket}</withStyles>
        <withStyles>pp {this.props.store.wallet.addressList.runebase}</withStyles>
        <withStyles>Exchange Address Balance: </withStyles>
        <withStyles>Wallet Address Balance: </withStyles>    
      </withStyles>
    );
  }
}
