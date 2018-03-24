import React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import styles from './styles';


const Progress = ({ classes, invalid, className, ...props }) => (
  <LinearProgress
    {...props}
    className={classNames(className, classes, {
      [classes.invalid]: invalid,
    })}
  />
);

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  className: PropTypes.string, // eslint-disable-line
};

export default withStyles(styles)(Progress);