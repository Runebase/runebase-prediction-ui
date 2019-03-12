import { action, observable } from 'mobx';
import { Rweb3 } from 'rweb3';

import { urls } from '../config/app';

export default class RunebaseChromeStore {
  @observable loggedIn = false;
  @observable popoverOpen = false;
  @observable popoverMessageId = undefined;

  constructor(app) {
    this.app = app;
    this.registerRunebaseChrome();
  }

  isInstalled = () => !!window.runebasechrome

  /**
   * Registers with RunebaseChrome and sets the event handler if not using a local wallet.
   */
  registerRunebaseChrome = () => {
    if (!this.localWallet) {
      console.log('Trying to register with RunebaseChrome...'); // eslint-disable-line
      window.addEventListener('message', this.handleWindowMessage, false);
      window.postMessage({ message: { type: 'CONNECT_RUNEBASECHROME' } }, '*');
    }
  }

  /**
   * Handles all window messages.
   * @param {MessageEvent} event Message to handle.
   */
  handleWindowMessage = (event) => {
    if (event.data.message && event.data.message.type) {
      const types = {
        RUNEBASECHROME_INSTALLED_OR_UPDATED: this.handleRunebaseChromeInstall,
        RUNEBASECHROME_ACCOUNT_CHANGED: this.handleRunebaseChromeAccountChange,
      };
      const messageAction = types[event.data.message.type];
      if (messageAction) messageAction(event);
    }
  }

  /**
   * Handles the event when RunebaseChrome posts an install or update message.
   */
  handleRunebaseChromeInstall = () => {
    window.location.reload();
  }

  /**
   * Handles the event when RunebaseChrome posts an account change message.
   * @param {MessageEvent} event Message to handle.
   */
  @action
  handleRunebaseChromeAccountChange = (event) => {
    if (event.data.message.payload.error) {
      console.error(event.data.message.payload.error); // eslint-disable-line
      return;
    }

    // Instantiate rweb3 instance on first callback
    if (!this.app.global.rweb3) {
      if (window.runebasechrome && window.runebasechrome.rpcProvider) {
        this.app.global.rweb3 = new Rweb3(window.runebasechrome.rpcProvider);
      }
    }

    this.loggedIn = event.data.message.payload.account.loggedIn;
    this.app.wallet.onRunebaseChromeAccountChange(event.data.message.payload.account);
  }

  @action
  openPopover = (messageId) => {
    this.popoverOpen = true;

    if (messageId) {
      this.popoverMessageId = messageId;
    } else if (!this.isInstalled) {
      this.popoverMessageId = 'runebasechrome.notInstalled';
    } else if (!this.loggedIn) {
      this.popoverMessageId = 'runebasechrome.notLoggedIn';
    } else {
      this.popoverMessageId = 'runebasechrome.loggedIn';
    }
  }

  @action
  onInstallClick = () => {
    window.open(urls.runebasechromeWebStore, '_blank');
    this.popoverOpen = false;
  }
}
