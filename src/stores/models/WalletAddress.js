import { observable } from 'mobx';
import { satoshiToDecimal } from '../../helpers/utility';

export default class WalletAddress {
  @observable address = ''
  @observable runebase = 0
  @observable pred = 0

  constructor(args, convertToDecimal = true) {
    Object.assign(this, args);
    this.address = this.address;
    this.runebase = convertToDecimal ? satoshiToDecimal(args.runebase) : args.runebase;
    this.pred = convertToDecimal ? satoshiToDecimal(args.pred) : args.pred;
  }
}
