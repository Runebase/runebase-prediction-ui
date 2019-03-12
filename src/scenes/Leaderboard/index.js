import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, defineMessages } from 'react-intl';
import { Grid, withStyles, Card as _Card, CardContent, Typography } from '@material-ui/core';

import styles from './styles';
import _Leaderboard from '../Event/components/Leaderboard';
import { Row, Content } from '../Event/components';

const messages = defineMessages({
  totalEvents: {
    id: 'leaderboard.totalEvents',
    defaultMessage: 'Total Events',
  },
  totalParticipants: {
    id: 'leaderboard.totalParticipants',
    defaultMessage: 'Total Participants',
  },
  totalRUNEBASE: {
    id: 'leaderboard.totalRUNEBASE',
    defaultMessage: 'Total bet in RUNEBASE',
  },
  totalPRED: {
    id: 'leaderboard.totalPRED',
    defaultMessage: 'Total voted in PRED',
  },
});

@withStyles(styles, { withTheme: true })
@injectIntl
@inject('store')
@observer
export default class Leaderboard extends Component {
  componentDidMount() {
    this.props.store.leaderboard.init();
  }

  render() {
    const { eventCount, participantsCount, totalPRED, totalRUNEBASE } = this.props.store.leaderboard;
    return (
      <Row>
        <SidebarContainer>
          <Card title={messages.totalEvents} value={eventCount} />
          <Card title={messages.totalParticipants} value={participantsCount} />
          <Card title={messages.totalRUNEBASE} value={totalRUNEBASE} />
          <Card title={messages.totalPRED} value={totalPRED} />
        </SidebarContainer>
        <Content>
          <_Leaderboard maxSteps={2} />
        </Content>
      </Row>
    );
  }
}

const Card = injectIntl(withStyles(styles)(({ title, value, classes, intl }) => (
  <_Card className={classes.card}>
    <CardContent>
      <Typography className={classes.cardHeader} align='left'>
        {intl.formatMessage(title)}
      </Typography>
      <Typography className={classes.cardContent}>
        {value}
      </Typography>
    </CardContent>
  </_Card>
)));

const SidebarContainer = withStyles(styles)(({ children, classes }) => (
  <Grid className={classes.SidebarContainer} item xs={12} md={4}>
    {children}
  </Grid>
));
