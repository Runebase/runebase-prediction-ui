/* eslint-disable */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { OrderConfirmDialog } from 'components';

const OrderTxConfirmDialog = inject('store')(injectIntl(observer(({ store: { wallet },  intl, id, onOrder}) => {
  return (    
    <OrderConfirmDialog
      onClose={() => wallet.redeemConfirmDialogOpen = false}
      onConfirm={wallet.confirmOrderExchange.bind(this, onOrder)}
      txFees={wallet.txFees}
      open={wallet.orderConfirmDialogOpen}
      txToken={wallet.selectedToken}
      txAmount={wallet.depositAmount}
      txDesc={intl.formatMessage({ id }, { address: wallet.toAddress })}
    />
  );
})));
export default OrderTxConfirmDialog;