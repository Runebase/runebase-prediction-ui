import gql from 'graphql-tag';

import { getTypeDef } from './schema';

const subscriptions = {
  onSyncInfo: `
    subscription OnSyncInfo {
      onSyncInfo {
        ${getTypeDef('SyncInfo')}
      }
    }
  `,
  onChartInfo: `
    subscription OnChartInfo {
      onChartInfo {
        ${getTypeDef('Trade')}
      }
    }
  `,
  onMyOrderInfo: `
    subscription OnMyOrderInfo {
      onMyOrderInfo {
        ${getTypeDef('NewOrder')}
      }
    }
  `,
  onBuyOrderInfo: `
    subscription OnBuyOrderInfo {
      onBuyOrderInfo {
        ${getTypeDef('NewOrder')}
      }
    }
  `,
  onSellOrderInfo: `
    subscription OnSellOrderInfo {
      onSellOrderInfo {
        ${getTypeDef('NewOrder')}
      }
    }
  `,
  onMarketInfo: `
    subscription OnMarketInfo {
      onMarketInfo {
        ${getTypeDef('Market')}
      }
    }
  `,
  onSelectedOrderInfo: `
    subscription OnSelectedOrderInfo {
      onSelectedOrderInfo {
        ${getTypeDef('NewOrder')}
      }
    }
  `,
};

function getSubscription(name) {
  return gql`${subscriptions[name]}`;
}

export default getSubscription;
export const channels = {
  ON_SYNC_INFO: 'onSyncInfo',
  ON_CHART_INFO: 'onChartInfo',
  ON_MYORDER_INFO: 'onMyOrderInfo',
  ON_BUYORDER_INFO: 'onBuyOrderInfo',
  ON_SELLORDER_INFO: 'onSellOrderInfo',
  ON_SELECTEDORDER_INFO: 'onSelectedOrderInfo',
  ON_MARKET_INFO: 'onMarketInfo',
};
