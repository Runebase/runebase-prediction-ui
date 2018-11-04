module.exports = {
  intervals: { // in MS
    syncInfo: 5000,
    chartInfo: 5000,
    myOrderInfo: 5000,
    buyOrderInfo: 5000,
    sellOrderInfo: 5000,
    tooltipDelay: 300,
    snackbarLong: 5000,
    snackbarShort: 2000,
  },
  defaults: {
    averageBlockTime: 142.01324503311258,
    unlockWalletMins: 1440,
  },
  maxTransactionFee: 0.1,
  faqUrls: {
    'en-US': 'https://www.runebase.io/prediction/faq',
  },
  debug: {
    // Set to false if in test environment and Insight API is down
    // and loading screen is blocking the view.
    showAppLoad: true,
  },
};
