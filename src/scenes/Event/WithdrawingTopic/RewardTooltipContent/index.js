import React from 'react';
import { withStyles, Table, TableBody, TableCell, TableRow, Divider } from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import _ from 'lodash';

import styles from './styles';

const RewardTooltipContent = ({ token, resultTokenAmount = 0, totalTokenAmount, tokenWinnings, runebaseWon, predRunebaseWon, classes }) => {
  function atMostEightDigits(num) {
    let numToString = _.toString(num);
    const numArr = numToString.split('.');
    if (numArr.length === 2) {
      if (numArr[1].length > 8) {
        numArr[1] = numArr[1].substring(0, 8);
      }
      numToString = `${numArr[0]}.${numArr[1]}`;
    }
    return numToString;
  }

  let runebaseWonFixed = runebaseWon;
  let predRunebaseWonFixed = predRunebaseWon;
  if (_.isNumber(runebaseWon)) {
    runebaseWonFixed = atMostEightDigits(runebaseWon);
  }
  if (_.isNumber(predRunebaseWon)) {
    predRunebaseWonFixed = atMostEightDigits(predRunebaseWon);
  }

  const tokenLosing = totalTokenAmount - resultTokenAmount;
  const tokenProfit = tokenWinnings - resultTokenAmount;

  return (
    <Table className={classes.table}>
      <TableBody>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCell}>
            <FormattedMessage id="tooltip.tokenInvestment" defaultMessage="Total {token} Investment" values={{ token }} />
          </TableCell>
          <TableCell className={cx(classes.tableCell, classes.root)} numeric padding="none">
            {totalTokenAmount}
          </TableCell>
        </TableRow>
        {token === 'PRED' &&
        (
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>
              <FormattedMessage id="tooltip.tokenProfit" defaultMessage="Total {token} Profit" values={{ token }} />
            </TableCell>
            <TableCell className={cx(classes.tableCell, classes.root)} numeric padding="none">
              {tokenProfit}
            </TableCell>
          </TableRow>
        )
        }
        {token === 'RUNES' &&
        (
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>
              <FormattedMessage id="tooltip.runebaseWon" defaultMessage="{token} Won" values={{ token }} />
            </TableCell>
            <TableCell className={cx(classes.tableCell, classes.root)} numeric padding="none">
              {runebaseWonFixed}
            </TableCell>
          </TableRow>
        )
        }
        {token === 'RUNES' &&
        (
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>
              <FormattedMessage id="tooltip.predRunebaseWon" defaultMessage="{token} Reward" values={{ token }} />
            </TableCell>
            <TableCell className={cx(classes.tableCell, classes.root)} numeric padding="none">
              {predRunebaseWonFixed}
            </TableCell>
          </TableRow>
        )
        }
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCell}>
            <FormattedMessage id="tooltip.tokenLosing" defaultMessage="Total {token} Losing" values={{ token }} />
          </TableCell>
          <TableCell className={cx(classes.tableCell, classes.root)} numeric padding="none">
            {tokenLosing}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCell}>
            <Divider />
          </TableCell>
          <TableCell className={cx(classes.tableCell)} numeric padding="none">
            <Divider />
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={cx(classes.tableCell, classes.lastRow)} >
            <FormattedMessage id="tooltip.tokenReward" defaultMessage="Total {token} Reward" values={{ token }} />
          </TableCell>
          <TableCell className={cx(classes.tableCell, classes.lastRow, classes.root)} numeric>
            {tokenWinnings}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default injectIntl(withStyles(styles)(RewardTooltipContent));
