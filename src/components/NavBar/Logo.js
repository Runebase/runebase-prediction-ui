import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Routes } from 'constants';

import styles from './styles';
import ImageLocaleWrapper from './components/ImageLocaleWrapper';

const RunebasePredictionLogo = ({ classes }) => (
  <Link to={Routes.RUNEBASE_PREDICTION}>
    <ImageLocaleWrapper
      appliedLanguages={['zh-Hans-CN']}
      src="/images/runebaseprediction-logo.svg"
      alt="runebaseprediction-logo"
      className={classes.navBarLogo}
    />
  </Link>
);

export default withStyles(styles, { withTheme: true })(RunebasePredictionLogo);
