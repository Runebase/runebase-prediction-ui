import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';
import { Button, Dropdown, NavItem } from 'react-materialize';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import Deposit from './Deposit';
import classes from './mystyle.css';
window.jQuery = $;
window.$ = $;

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class MarketInfo extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      market: '', 
    };
  }
  componentDidMount = () =>{
    $(() => {  
      $(document).on('click','.addressBookSelection', function(e){ 
        const $this = $(`#${this.id}`);
        $this.find('ul').fadeToggle(); 
      })
        .on('click', '.addressBookSelection ul li', function(e){
          const $this = $(this);
          const $selectBox = $('.addressBookSelection');
        
          $selectBox.find('.active').removeClass('active');
          $this.addClass('active');
          $selectBox.find('.heading').html($this.html());
          $selectBox.find('ul').scrollTop(0);
        
          $('#Event strong').html( `${this.id  }- ${  $(this).find("strong").html() } selected` );
        });
    }); 
  }
  handleSelectChange = (event) => {
    this.props.store.wallet.changeAddress(event);
  }
  render() {
    const { store: { wallet } } = this.props;
    const stylist = {
      heightRow: {
        height: 75,
      },
    };;
    this.state.market = wallet.market;
    return (
      <div>        
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
                <div className="addressBookSelection" id="selectBox_addressBook_1">
                  <div className="heading">Select Your Address<span>&#9662;</span></div>
                  <ul id='dropdown-menu btn-block'>
                    <li>
                      Please Select Your Address
                    </li>
                    {wallet.addresses.map((addressData) => {
                      if(addressData.fun > 0 || addressData.runebase > 0|| addressData.pred > 0){
                        return (
                          <li
                            onClick={this.handleSelectChange}
                            address={addressData.address} 
                            runes={addressData.runebase}
                            pred={addressData.pred}
                            fun={addressData.fun}
                            key={addressData.address}
                          > 
                            {addressData.address} | {addressData.runebase} {this.props.store.wallet.market} | {addressData.runebase} RUNES | {addressData.pred} PRED | {addressData.fun} FUN
                          </li>
                        );}
                      return null;
                    })}
                  </ul>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          {wallet.addresses.map((addressData) => {
            if(addressData.address === wallet.currentAddressBalanceKey){
              return (
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={3}>
                      <p>RUNES</p>
                      <p>{addressData.runebase}</p>
                    </Grid>
                    <Grid item xs={3}>
                      <p>PRED</p>
                      <p>{addressData.pred}</p>
                    </Grid>
                    <Grid item xs={3}>
                      <p>FUN</p>
                      <p>{addressData.fun}</p>
                    </Grid>
                  </Grid>
                </Grid>
              );}
            return null;
          })}
          <Grid item xs={12}>
            <withStyles>{this.state.market}/RUNES</withStyles>
          </Grid>
          <Grid item xs={12}>
            <withStyles>Contract Address: {wallet.currentMarketContract}</withStyles>
          </Grid>
        </Grid>
      </div>
    );
  }  
}
