import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './styles';


@withStyles(styles, { withTheme: true })
@injectIntl
export default class DepositDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    dialogVisible: PropTypes.bool.isRequired,
    walletAddress: PropTypes.string,
    runebaseAmount: PropTypes.string,
    predAmount: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onCopyClicked: PropTypes.func.isRequired,
  }

  static defaultProps = {
    walletAddress: undefined,
    runebaseAmount: undefined,
    predAmount: undefined,
  }

  render() {
    const {
      classes,
      dialogVisible,
      walletAddress,
      runebaseAmount,
      predAmount,
      onClose,
      onCopyClicked,
    } = this.props;

    if (!walletAddress) {
      return null;
    }

    return (
      <Dialog open={dialogVisible} onClose={onClose}>
        <DialogTitle>
          <FormattedMessage id="depositDialog.title" defaultMessage="RUNEBASE/PRED Deposit Address" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" className={classes.depositAddress}>
            {walletAddress}
          </Typography>
          <Typography variant="body2" className={classes.runebaseAmount}>
            {`RUNEBASE: ${runebaseAmount}`}
          </Typography>
          <Typography variant="body2">
            {`PRED: ${predAmount}`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            <FormattedMessage id="str.close" defaultMessage="Close" />
          </Button>
          <CopyToClipboard text={walletAddress} onCopy={onCopyClicked}>
            <Button color="primary">
              <FormattedMessage id="str.copy" defaultMessage="Copy" />
            </Button>
          </CopyToClipboard>
        </DialogActions>
      </Dialog>
    );
  }
}
