import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  Card,
  Grid,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import FundExchange from './FundExchange';
import './mystyle.css';
import DropDownAddresses from './DropDownAddresses';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class MarketInfo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor (props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleSelectChange = (key, event) => {
    this.props.store.wallet.changeAddress(key, event);
    this.setState({ show: false });
  }
  
  handleToggle = (e) => {
    e.target.focus();
    this.setState({ show: !this.state.show });
  }
  
  handleBlur = (e) => {
    if (e.nativeEvent.explicitOriginalTarget &&
        e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget) {
      return;
    }

    if (this.state.show) {
      const timer = setTimeout(() => {
        this.setState({ show: false });
      }, 200);
    }
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

                <DropDownAddresses 
                  show={this.state.show}
                  handleToggle={this.handleToggle}
                  handleBlur={this.handleBlur}
                  handleSelectChange={this.handleSelectChange}
                />
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
