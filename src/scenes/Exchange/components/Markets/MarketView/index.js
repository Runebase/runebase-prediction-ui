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
    let changePos = false;
    let changeNeg = false;
    if (market === wallet.market) {
      active = true;
    }
    const triggerActive = classNames(
      'marketCard',
      {
        activeCard: active,
        notSelected: !active,
      }
    );
    if (change.charAt(0) === '-') {
      changePos = false;
      changeNeg = true;
    } else {
      changePos = true;
      changeNeg = false;
    }
    const changeClass = classNames({
      positiveChange: changePos,
      negativeChange: changeNeg,
    });
    return (
      <div>
        <Card className={triggerActive} onClick={() => this.props.store.wallet.changeMarket(market, this.props.store.wallet.addresses)}>
          <Grid container>
            <Grid item xs={3}>
              <p className='textCenter fat'>{tokenName}</p>
            </Grid>
            <Grid item xs={9}>
              <p className='textCenter fat'>{market}/RUNES</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} className='fullheight'>
              <div className='fullWidth'>
                <TokenImage token={market} />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="like-table">
                <div className="like-table-row">
                  <div className="like-table-cell valign-middle">
                    <Typography variant="subtitle2" className='textCenter'>Price</Typography>
                    <Typography variant="subtitle2" className='textCenter fat'>{price}</Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="like-table">
                <div className="like-table-row">
                  <div className="like-table-cell valign-middle">
                    <Typography variant="subtitle2" className='textCenter'>Change</Typography>
                    <Typography variant="subtitle2" className={`textCenter fat ${changeClass}`}>{change}%</Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="like-table">
                <div className="like-table-row">
                  <div className="like-table-cell valign-middle">
                    <Typography variant="subtitle2" className='textCenter'>Volume</Typography>
                    <Typography variant="subtitle2" className='textCenter fat'>{fixedVolume}</Typography>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}
