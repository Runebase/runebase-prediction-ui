import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { Typography, Tooltip, withStyles } from '@material-ui/core';

import RewardTooltipContent from './RewardTooltipContent';
import { Icon } from '../components';
import { Container, Label } from './components';
import { i18nToUpperCase } from '../../../helpers/i18nUtil';
import styles from './styles';

const messages = defineMessages({
  withdrawDetailReturnRateMsg: {
    id: 'withdrawDetail.returnRate',
    defaultMessage: 'Return rate:',
  },
});

@withStyles(styles)
@injectIntl
class Reward extends Component {
  render() {
    const { eventPage, topic, classes } = this.props;
    const { runebaseWinnings, predWinnings, betBalances, voteBalances } = eventPage;
    const totalBetAmount = _.sum(betBalances);
    const totalVoteAmount = _.sum(voteBalances);
    const runebaseReturnRate = totalBetAmount ? ((runebaseWinnings - totalBetAmount) / totalBetAmount) * 100 : 0;
    const predReturnRate = totalVoteAmount ? ((predWinnings - totalVoteAmount) / totalVoteAmount) * 100 : 0;
    const resultBetAmount = betBalances[topic.resultIdx];
    const resultVoteAmount = voteBalances[topic.resultIdx];
    const totalRunebaseWinningBets = eventPage.topic.runebaseAmount[topic.resultIdx];
    const totalRunebaseBets = _.sum(topic.runebaseAmount);
    const totalLosingRunebaseBets = totalRunebaseBets - totalRunebaseWinningBets;
    const losersRunebaseReward = totalLosingRunebaseBets / 100;
    const losersAdjustedRunebase = totalLosingRunebaseBets - losersRunebaseReward;
    const runebaseWon = ((resultBetAmount / totalRunebaseWinningBets) * losersAdjustedRunebase) || 0;
    const totalPredWinningBets = topic.predAmount[topic.resultIdx];
    const predRunebaseWon = ((resultVoteAmount / totalPredWinningBets) * losersRunebaseReward) || 0;
    if (predRunebaseWon > 0 || runebaseWon > 0) {
      return (
        <Container>
          <RewardIcon />
          <RewardTitle />
          <div className={classes.rowDiv}>
            <RunebaseReturn
              runebaseWinnings={eventPage.runebaseWinnings}
              runebaseWon={runebaseWon}
              predRunebaseWon={predRunebaseWon}
              resultTokenAmount={resultBetAmount}
              totalTokenAmount={totalBetAmount}
              tokenWinnings={runebaseWinnings}
              runebaseReturnRate={runebaseReturnRate}
            />
            <Separator />
            <PredUsed
              predWinnings={eventPage.predWinnings}
              resultTokenAmount={resultVoteAmount}
              totalTokenAmount={totalVoteAmount}
              tokenWinnings={predWinnings}
              predReturnRate={predReturnRate}
            />
          </div>
        </Container>
      );
    }
    return <Fragment />;
  }
}

const RewardIcon = () => <Icon type='token' />;

const RewardTitle = () => (
  <Label>
    <FormattedMessage id="withdrawDetail.reward" defaultMessage="REWARD">
      {(txt) => i18nToUpperCase(txt)}
    </FormattedMessage>
  </Label>
);

const Separator = styled.div`
  display: inline-block;
  width: 1px;
  height: 75px;
  background: ${props => props.theme.palette.divider};
  margin-left: ${props => props.theme.padding.md.px};
  margin-right: ${props => props.theme.padding.md.px};
`;

@withStyles(styles, { withTheme: true })
@injectIntl
class RunebaseReturn extends Component {
  render() {
    const { runebaseWinnings, runebaseReturnRate, intl, classes, ...props } = this.props;
    return (
      <div className={classes.colDiv}>
        <Typography variant="display1">
          <div className={classes.rowDiv}>
            +{runebaseWinnings} <div className={classes.tokenDiv}>RUNES</div>
            <Tooltip classes={{ tooltip: classes.rewardTooltip }} id="tooltip-reward" title={<RewardTooltipContent token="RUNES" {...props} />}>
              <i className="icon iconfont icon-ic_question" />
            </Tooltip>
          </div>
        </Typography>
        <Typography variant="caption">
          {`${intl.formatMessage(messages.withdrawDetailReturnRateMsg)} ${runebaseReturnRate.toFixed(2)}%`}
        </Typography>
      </div>
    );
  }
}

@withStyles(styles, { withTheme: true })
@injectIntl
class PredUsed extends Component {
  render() {
    const { predWinnings, predReturnRate, intl, classes, ...props } = this.props;
    return (
      <div className={classes.colDiv}>
        <Typography variant="display1">
          <div className={classes.rowDiv}>
            +{predWinnings} <div className={classes.tokenDiv}>PRED</div>
            <Tooltip classes={{ tooltip: classes.rewardTooltip }} id="tooltip-reward" title={<RewardTooltipContent token="PRED" {...props} />}>
              <i className="icon iconfont icon-ic_question" />
            </Tooltip>
          </div>
        </Typography>
        <Typography variant="caption">
          {`${intl.formatMessage(messages.withdrawDetailReturnRateMsg)} ${predReturnRate.toFixed(2)}%`}
        </Typography>
      </div>
    );
  }
}

export default Reward;
