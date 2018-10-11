import { satoshiToDecimal } from '../../helpers/utility';

export default class AddressBalance {
  address = ''
  runebase = ''
  pred = ''

  constructor(addressBalance) {
    Object.assign(this, addressBalance);
    this.address = this.address;
    this.runebase = satoshiToDecimal(addressBalance.runebase);
    this.pred = satoshiToDecimal(addressBalance.pred);
  }
}
