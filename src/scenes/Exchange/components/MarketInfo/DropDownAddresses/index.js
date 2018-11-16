import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Divider } from 'semantic-ui-react';
import {
  Card,
  Grid,
  withStyles,
} from '@material-ui/core';
import './styles.css';

@inject('store')
@observer
export default class DropDownAddresses extends Component {
  render () {
    const { store: { wallet } } = this.props;
    const {
      show,
      handleToggle,
      handleBlur,
      handleSelectChange,
    } = this.props;
    
    return (
      <div className="dropdown-container">
        <label className="arrow" htmlFor="selectAddress">
          <input
            id='selectAddress'
            type="button"
            value={wallet.currentAddressSelected !== '' ? wallet.currentAddressSelected : 'Please Select An Address' }
            className="dropdown-btn"
            onClick={handleToggle}
            onBlur={handleBlur}
          />
        </label>
        <ul className="dropdown-list" hidden={!show}>
          {wallet.addresses.map((addressData, key) => {
            
            if(addressData.fun > 0 || addressData.runebase > 0 || addressData.pred > 0 || addressData.exchangerunes > 0 || addressData.exchangepred > 0 || addressData.exchangefun > 0){
              return (
                <li
                  className="option"
                  onClick={handleSelectChange.bind(this, key) /* eslint-disable-line */ }
                  key={key}
                  address={addressData.address} 
                  runes={addressData.runebase}
                  pred={addressData.pred}
                  fun={addressData.fun}                            
                >                      
                  {addressData.address}
                  <Divider horizontal>Wallet</Divider>  
                  <Grid container className='centerText'>
                    <Grid item xs={3}>
                      <div className='fullWidth'>
                        RUNES
                      </div>
                      <div className='fullWidth'>
                        {addressData.runebase}
                      </div>
                    </Grid>
                    <Grid item xs={3} address={addressData.address}>
                      <div className='fullWidth'>
                        PRED
                      </div>
                      <div className='fullWidth'>
                        {addressData.pred} 
                      </div>                      
                    </Grid>
                    <Grid item xs={3} address={addressData.address}>
                      <div className='fullWidth'>
                        FUN
                      </div>
                      <div className='fullWidth'>
                        {addressData.fun}
                      </div>                       
                    </Grid>
                  </Grid>
                  <Divider horizontal>Exchange</Divider>
                  <Grid container className='centerText'>
                    <Grid item xs={3} >
                      <div className='fullWidth'>
                        RUNES
                      </div>
                      <div className='fullWidth'>
                        {addressData.exchangerunes} 
                      </div>                      
                    </Grid>
                    <Grid item xs={3} address={addressData.address}>
                      <div className='fullWidth'>
                        PRED
                      </div>
                      <div className='fullWidth'>
                        {addressData.exchangepred} 
                      </div>                      
                    </Grid>
                    <Grid item xs={3} address={addressData.address}>
                      <div className='fullWidth'>
                        FUN
                      </div>
                      <div className='fullWidth'>
                        {addressData.exchangefun} 
                      </div>                      
                    </Grid>
                  </Grid>
                </li>
              );}
            return null;
          })}
        </ul>
      </div>
    );
  }
}