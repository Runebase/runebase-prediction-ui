import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Select, MenuItem } from '@material-ui/core';

const LanguageSelector = inject('store')(observer(({ store: { ui } }) => (
  <Select
    value={ui.locale}
    onChange={(e) => ui.changeLocale(e.target.value)}
    name="lang"
    disableUnderline
  >
    <MenuItem value="en-US">English</MenuItem>
  </Select>
)));
