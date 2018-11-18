import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Card, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames/bind';
import './styles.css';
import { TokenImage } from '../../../helpers';

@injectIntl
@inject('store')
export default class MarketView extends PureComponent {

  render() {
    const { market, tokenName, price, change, volume } = this.props.event;
    const { store: { wallet } } = this.props;
    const fixedVolume = parseFloat(volume).toFixed(2);
    let active = false;
    if (market === wallet.market) {
      active = true;
    }
    const triggerActive = classNames(
      'marketCard',
      {
        'activeCard': active,
        'notSelected': !active,
      }
    );
    return (
      <div>
        <Card className={triggerActive} onClick={() => this.props.store.wallet.changeMarket(market, this.props.store.wallet.addresses)}>
          <Grid container>
            <Grid item xs={3}>
              <p className='textCenter'>{tokenName}</p>
            </Grid>
            <Grid item xs={9}>
              <p className='textCenter'>{market}/RUNES</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} className='fullheight'>
              <div className='fullWidth'>
                <TokenImage token={market} />
              </div>
            </Grid>
            <Grid item xs={3}>
              <Typography className='textCenter'>price</Typography>
              <Typography className='textCenter'>{price}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className='textCenter'>change</Typography>
              <Typography className='textCenter'>{change}%</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className='textCenter'>Volume</Typography>
              <Typography className='textCenter'>{fixedVolume}</Typography>
            </Grid>
          </Grid>      
        </Card>
      </div>
    );
  }
}
