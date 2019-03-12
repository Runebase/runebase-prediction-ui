import React from 'react';
import { withStyles, Typography, Button, Popover, Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';

import styles from './styles';

const messages = defineMessages({
  'runebasechrome.loggedIn': {
    id: 'runebasechrome.loggedIn',
    defaultMessage: 'You are logged in to RunebaseChrome.',
  },
  'runebasechrome.loginToView': {
    id: 'runebasechrome.loginToView',
    defaultMessage: 'Please login to RunebaseChrome to view this page.',
  },
  'runebasechrome.notInstalled': {
    id: 'runebasechrome.notInstalled',
    defaultMessage: 'You have not installed RunebaseChrome yet. RunebaseChrome is a Chrome extension wallet that allows you to sign transaction requests from web dapps. It is strongly recommended that you install it to gain the full experience.',
  },
  'runebasechrome.notLoggedIn': {
    id: 'runebasechrome.notLoggedIn',
    defaultMessage: 'You are not logged into RunebaseChrome.',
  },
  'runebasechrome.loggedIntoWrongNetwork': {
    id: 'runebasechrome.loggedIntoWrongNetwork',
    defaultMessage: 'Logged into wrong network. Switch your RunebaseChrome network.',
  },
});

const Logo = withStyles(styles)(({ classes }) => (
  <img src="/images/runebasechrome-logo.png" alt="RunebaseChrome Logo" className={classes.logo} />
));

const InstallNowButton = inject('store')(({ store: { runebasechrome } }) => (
  <Button
    variant="contained"
    size="small"
    color="primary"
    onClick={runebasechrome.onInstallClick}
  >
    <FormattedMessage id="runebasechrome.installNow" defaultMessage="Install Now" />
  </Button>
));

export const InstallRunebaseChromeInline = withStyles(styles)(injectIntl(inject('store')(observer(({ classes, intl, store: { runebasechrome } }) => (
  <div className={classes.inlineRoot}>
    <Logo />
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={12} sm={6}>
        <Typography className={cx(classes.message, 'center')}>
          {intl.formatMessage(runebasechrome.isInstalled ? messages['runebasechrome.loginToView'] : messages['runebasechrome.notInstalled'])}
        </Typography>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
    {!runebasechrome.isInstalled && <InstallNowButton />}
  </div>
)))));

export const InstallRunebaseChromePopover = withStyles(styles)(injectIntl(inject('store')(observer(({ classes, intl, store: { runebasechrome } }) => {
  if (!runebasechrome.popoverMessageId) return null;
  const message = messages[runebasechrome.popoverMessageId];

  return (
    <Popover
      open={runebasechrome.popoverOpen}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      transformOrigin={{ horizontal: 'center', vertical: 'center' }}
    >
      <div className={classes.popoverRoot}>
        <Grid container>
          <Grid item xs={12} sm={2}><Logo /></Grid>
          <Grid item xs={12} sm={10}>
            <Typography className={cx(classes.message, 'left', 'marginLeft')}>
              {intl.formatMessage(message)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs className={classes.buttonContainer}>
            {runebasechrome.isInstalled ? (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => runebasechrome.popoverOpen = false}
              >
                <FormattedMessage id="str.ok" defaultMessage="Ok" />
              </Button>
            ) : (
              <div>
                <Button
                  size="small"
                  color="primary"
                  className={classes.remindButton}
                  onClick={() => runebasechrome.popoverOpen = false}
                >
                  <FormattedMessage id="runebasechrome.remindMeLater" defaultMessage="Remind Me Later" />
                </Button>
                <InstallNowButton />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </Popover>
  );
}))));
