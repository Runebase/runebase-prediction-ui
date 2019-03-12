import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { AppBar, Collapse, Toolbar, withStyles, IconButton, Hidden } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { injectIntl } from 'react-intl';
import { isEmpty } from 'lodash';

import RunebasePredictionLogo from './Logo';
import RunebasePrediction from './RunebasePrediction';
import PredCourt from './PredCourt';
import Wallet from './Wallet';
import { SearchButton, SearchBarField } from './Search';
import MyActivities from './MyActivities';
import { DropdownMenuButton, DropdownMenu } from './DropdownMenu';
import SearchResult from './components/SearchResult';
import styles from './styles';
import FavoriteDrawer from '../FavoriteDrawer';
import { Favorite } from './Favorite';

@withStyles(styles, { withTheme: true })
@injectIntl
@inject('store')
@observer
export default class NavBar extends Component {
  componentDidMount() {
    this.props.store.global.getActionableItemCount();
  }

  handleSearchBarKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.props.store.search.init();
        break;
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;
    const { ui, search } = this.props.store;

    return (
      <AppBar className={ui.searchBarMode ? classes.navBarShadow : classes.navBar}>
        <Collapse in={!ui.searchBarMode}>
          <Toolbar className={classes.navBarWrapper}>
            <div className={classes.navSection}>
              <RunebasePredictionLogo {...this.props} />
              <Hidden xsDown>
                <RunebasePrediction {...this.props} />
                <PredCourt {...this.props} />
              </Hidden>
              <Favorite />
            </div>
            <SearchButton classes={classes} />
            <Hidden xsDown>
              <Wallet />
              <MyActivities {...this.props} />
              <DropdownMenuButton />
            </Hidden>
            <Hidden smUp>
              <IconButton className={classes.menuButton} onClick={ui.toggleDropdownMenu} color="inherit" aria-label="Menu">
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Collapse>
        <DropdownMenu />
        <Collapse in={ui.searchBarMode}>
          <Toolbar className={classes.searchBarWrapper}>
            <SearchBarField onSearchBarKeyDown={this.handleSearchBarKeyDown} />
          </Toolbar>
        </Collapse>
        <Collapse in={ui.searchBarMode && !isEmpty(search.phrase)}>
          <SearchResult />
        </Collapse>
        <FavoriteDrawer />
      </AppBar>
    );
  }
}
