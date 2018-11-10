import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { inject } from 'mobx-react';
import { injectIntl, defineMessages } from 'react-intl';
import { Button, Grid, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExecuteOrderTxConfirmDialog from '../ExecuteOrderTxConfirmDialog';
import { TokenImage, OrderTypeIcon, StatusIcon } from '../../../helpers';


import styles from './styles';
import './styles.css';
const messages = defineMessages({
  executeOrderConfirmMsgSendMsg: {
    id: 'executeOrderConfirmMsg.send',
    defaultMessage: 'send to address {address}',
  },
});

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
export default class OrderBook extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };


  render() {
    const { classes } = this.props;
    const { store: { wallet } } = this.props;
    const { orderId, txid, buyToken, sellToken, amount, startAmount, owner, blockNum, time, price, token, type, status } = this.props.event;
    const amountToken = amount / 1e8;
    const startAmountToken = startAmount / 1e8;
    const filled = startAmount - amount;
    let total = amountToken * price;
    total = total.toFixed(8);
    const exchangeAmount = amount;
    return (
      <div className={`classes.root ${type}`}>
        <ExpansionPanel className={type}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container className='centerText' wrap="nowrap"> 
              <Grid item xs={2} zeroMinWidth>
                <Typography noWrap>orderId</Typography>
                <Typography noWrap>{orderId}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>token</Typography>
                <Typography noWrap>{token}</Typography> 
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>amount</Typography>
                <Typography noWrap>{amountToken}</Typography> 
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>price</Typography>
                <Typography noWrap>{price}</Typography> 
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>type</Typography>
                <Typography noWrap>{type}</Typography> 
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>status</Typography>
                <Typography noWrap>{status}</Typography> 
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.dashboardOrderBookWrapper} >
    
            <Grid container className='centerText' >
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item xs={3}>
                    <p>{token}/RUNES</p>
                    <div className='fullwidth'>
                      <TokenImage token={token} />
                    </div>                
                  </Grid>
                  <Grid item xs={3} className='inheritHeight'>
                    <p>{type}</p>
                    <OrderTypeIcon orderType={type} />                
                  </Grid>
                  <Grid item xs={3} className='inheritHeight'>
                    <p>{status}</p>
                    <StatusIcon status={status} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>                
                <Grid container className='spacingOrderBook vcenter'>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>amount</Typography>
                    <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{amountToken}</Typography>
                  </Grid>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>price</Typography>
                    <div className='verticalCenter'>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{price}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>total</Typography>
                    <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{total}</Typography>
                  </Grid>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>filled</Typography> 
                    <div className='ordersPropertyContent inheritHeight'>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant='subheading'>{filled}</Typography>
                        </Grid>
                        <span className='divider'></span> 
                        <Grid item xs={12}>
                          <Typography variant='subheading'>{startAmountToken}</Typography>
                        </Grid>
                      </Grid>  
                    </div> 
                  </Grid>
                </Grid>                
              </Grid>
              
              <Grid item xs={12}className='spacingOrderBook'>
                <Typography variant='subheading' className=''>owner:</Typography>
                <Typography className={classes.root}><a href={`https://explorer.runebase.io/address/${owner}`}>{owner}</a></Typography>                            
              </Grid>
              <Grid item xs={12} className='spacingOrderBook'>
                <Typography variant='subheading' className={classes.root}>txid:</Typography>  
                <Typography className={classes.root}><a href={`https://explorer.runebase.io/tx/${txid}`}>{txid}</a></Typography>    
              </Grid>               
              <Grid item xs={6} className='spacingOrderBook'>
                <Typography variant='subheading'>created time</Typography>
                <Typography>{time}</Typography>                
              </Grid>
              <Grid item xs={6} className='spacingOrderBook'>
                <Typography variant='subheading'>created blockNum</Typography>
                <Typography>{blockNum}</Typography>
              </Grid>
              <form>
                <div data-role="rangeslider">
                  <input type="range" name="range-1a" id="range-1a" min="0" max="100" value="40" data-popup-enabled="true" data-show-value="true" />
                </div>
              </form>
              <Grid item xs={12}>
                <div>
                  <Button 
                    onClick={ () =>{                      
                      if (this.props.store.wallet.currentAddressSelected === '')  {
                        this.addressCheck();                        
                      }
                      else {
                        wallet.prepareExecuteOrderExchange(orderId, exchangeAmount); 
                      }                      
                    }} 
                    color="primary">
                    Execute Order
                  </Button>
                  <ExecuteOrderTxConfirmDialog onExecuteOrder={this.onExecuteOrder} id={messages.executeOrderConfirmMsgSendMsg.id} />
                </div>
              </Grid>
            </Grid>
            <Grid container>
              
            </Grid>
            <Grid container>
              
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}