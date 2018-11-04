import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {
  Card,
  Grid,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import FundExchange from './FundExchange';
import classes from './mystyle.css';
window.jQuery = $;
window.$ = $;

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class MarketInfo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
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
    const { classes, store: { wallet } } = this.props;
    const stylist = {
      heightRow: {
        height: 75,
      },
    };;
    return (
      <div>        
        <Grid container>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12} style={stylist.heightRow}>
                <FundExchange />                        
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
                  <div className="heading">
                    {(() => {
                      console.log(wallet.currentAddressBalanceKey);
                      if (wallet.currentAddressBalanceKey !== '') {
                        return (
                          <div>{wallet.currentAddressBalanceKey}</div>
                        );
                      }
                      return (
                        <div>Please Select Your Address</div>
                      );                        
                    })()}
                  </div>
                  <ul id='dropdown-menu btn-block'>
                    {wallet.addresses.map((addressData) => {
                      if(addressData.fun > 0 || addressData.runebase > 0 || addressData.pred > 0 || addressData.exchangerunes > 0 || addressData.exchangepred > 0 || addressData.exchangefun > 0){
                        return (
                          <li
                            onClick={this.handleSelectChange}
                            address={addressData.address} 
                            runes={addressData.runebase}
                            pred={addressData.pred}
                            fun={addressData.fun}
                            key={addressData.address}
                          >                      
                            {addressData.address}
                            <p address={addressData.address}>Wallet</p>  
                            <Grid container address={addressData.address}>
                              <Grid item xs={3} address={addressData.address}>
                                {addressData.runebase} RUNES
                              </Grid>
                              <Grid item xs={3} address={addressData.address}>
                                {addressData.pred} PRED
                              </Grid>
                              <Grid item xs={3} address={addressData.address}>
                                {addressData.fun} FUN
                              </Grid>
                            </Grid>
                            <p address={addressData.address} >Exchange</p>
                            <Grid container address={addressData.address}>
                              <Grid item xs={3} >
                                {addressData.exchangerunes} RUNES
                              </Grid>
                              <Grid item xs={3} address={addressData.address}>
                                {addressData.exchangepred} PRED
                              </Grid>
                              <Grid item xs={3} address={addressData.address}>
                                {addressData.exchangefun} FUN
                              </Grid>
                            </Grid>
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
        <Card className={classes.dashboardOrderBookTitle}>
          <p>My Wallet Balances</p>
        </Card>        
        <Grid container>          
          {wallet.addresses.map((addressData) => {              
            if(addressData.address === wallet.currentAddressBalanceKey){                
              return (
                <Grid item xs={12}> 
                  <Card className={classes.dashboardOrderBook}>                 
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
                  </Card>                  
                </Grid>
              );}
            return null;
          })}       
          <Grid item xs={12}>
            <withStyles>{wallet.market}/RUNES</withStyles>
          </Grid>
          <Grid item xs={12}>
            <withStyles>Contract Address: {wallet.currentMarketContract}</withStyles>
          </Grid>
        </Grid>        
      </div>
    );
  }  
}
