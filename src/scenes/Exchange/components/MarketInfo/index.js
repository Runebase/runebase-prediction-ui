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
import './mystyle.css';
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
      $(document).on('click','.addressBookSelection', function(){ 
        const $this = $(`#${this.id}`);
        $this.find('ul').fadeToggle(); 
      })
        .on('click', '.addressBookSelection ul li', function(){
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
  handleSelectChange = (key, event) => {
    this.props.store.wallet.changeAddress(key, event);
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
                      if (wallet.currentAddressSelected !== '') {
                        return (
                          <div>{wallet.currentAddressSelected}</div>
                        );
                      }
                      return (
                        <div>Please Select Your Address</div>
                      );                        
                    })()}
                  </div>
                  <ul id='dropdown-menu btn-block'>
                    {wallet.addresses.map((addressData, key) => {
                      /* eslint-disable */
                      if(addressData.fun > 0 || addressData.runebase > 0 || addressData.pred > 0 || addressData.exchangerunes > 0 || addressData.exchangepred > 0 || addressData.exchangefun > 0){
                        return (
                          <li
                            onClick={this.handleSelectChange.bind(this, key) /* eslint-disable-line no-param-reassign */ }
                            key={key}
                            address={addressData.address} 
                            runes={addressData.runebase}
                            pred={addressData.pred}
                            fun={addressData.fun}                            
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
                        /* eslint-enable */
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
          {(() => {
            if (wallet.currentAddressKey !== '') {
              return (
                <Grid item xs={12}> 
                  <Card className={classes.dashboardOrderBook}>                 
                    <Grid container>                    
                      <Grid item xs={3}>
                        <p>RUNES(GAS)</p>
                        <p>{wallet.addresses[wallet.currentAddressKey].runebase}</p>
                      </Grid>
                      <Grid item xs={3}>
                        <p>PRED</p>
                        <p>{wallet.addresses[wallet.currentAddressKey].pred}</p>
                      </Grid>
                      <Grid item xs={3}>
                        <p>FUN</p>
                        <p>{wallet.addresses[wallet.currentAddressKey].fun}</p>
                      </Grid>                    
                    </Grid>
                  </Card>                  
                </Grid>
              );
            }
            return (
              <Grid item xs={12}>
                <Card className={classes.dashboardOrderBook}>
                  <Grid container>
                    <Grid item xs={12}>
                      <p>...</p>
                    </Grid>                      
                  </Grid>
                </Card>
              </Grid>
            );                        
          })()}            
          <Grid item xs={12}>
            <div>{wallet.market}/RUNES</div>
          </Grid>
          <Grid item xs={12}>
            <div>Contract Address: {wallet.currentMarketContract}</div>
          </Grid>
        </Grid>        
      </div>
    );
  }  
}
