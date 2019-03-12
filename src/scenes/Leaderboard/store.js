import { observable, action, reaction, toJS } from 'mobx';
import { Token, Routes } from 'constants';

import { queryLeaderboardStats, queryMostVotes } from '../../network/graphql/queries';
import { satoshiToDecimal } from '../../helpers/utility';

const INIT_VALUES = {
  eventCount: 0,
  participantsCount: 0,
  totalPRED: '',
  totalRUNEBASE: '',
  leaderboardVotes: [],
  activeStep: 0,
};

const paras = [Token.RUNEBASE, Token.PRED];

export default class LeaderboardStore {
  @observable eventCount = INIT_VALUES.eventCount
  @observable participantsCount = INIT_VALUES.participantsCount
  @observable totalPRED = INIT_VALUES.totalPRED
  @observable totalRUNEBASE = INIT_VALUES.totalRUNEBASE
  @observable leaderboardVotes = INIT_VALUES.leaderboardVotes
  @observable activeStep = INIT_VALUES.activeStep
  leaderboardLimit = 10
  constructor(app) {
    this.app = app;
    reaction(
      () => toJS(this.app.wallet.addresses) + this.app.global.syncBlockNum + this.app.global.online,
      () => {
        if (this.app.ui.location === Routes.LEADERBOARD) {
          this.init();
        }
      }
    );
    reaction(
      () => this.activeStep,
      () => this.loadLeaderboard(),
    );
  }

  @action
  init = async () => {
    Object.assign(this, INIT_VALUES);
    this.app.ui.location = Routes.LEADERBOARD;
    const res = await queryLeaderboardStats();
    Object.assign(this, res, { totalPRED: satoshiToDecimal(res.totalPred), totalRUNEBASE: satoshiToDecimal(res.totalRunebase) });
    await this.loadLeaderboard();
  }

  @action
  loadLeaderboard = async () => {
    const { votes } = await queryMostVotes([{ token: paras[this.activeStep] }], null, 10, 0);
    this.leaderboardVotes = votes;
  }
}
