module.exports = {
  isProduction: () => process.env.NODE_ENV === 'production',
  intervals: { // in MS
    syncInfo: 5000,
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
    'en-US': 'https://www.runebaseprediction.network/faq',
    'zh-Hans-CN': 'https://cn.runebaseprediction.network/faq',
  },
  urls: {
    runebasechromeWebStore: 'https://chrome.google.com/webstore/detail/runebasechrome/hdmjdgjbehedbnjmljikggbmmbnbmlnd',
  },
  debug: {
    // Set to false if in test environment and Insight API is down
    // and loading screen is blocking the view.
    showAppLoad: false,
  },
};
