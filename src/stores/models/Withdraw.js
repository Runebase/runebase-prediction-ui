import { TransactionType, Token } from 'constants';
import { satoshiToDecimal } from '../../helpers/utility';

/**
 * Model for Withdraw.
 */
export default class Withdraw {
  type = '' // One of: withdraw or withdraw escrow
  txid = '' // Withdraw ID assigned by the blockchain
  blockNum = 0 // Block number when Withdraw was recorded on blockchain
  blockTime = '' // Block timestamp for blockNum
  topicAddress = '' // Topic contract address associated with Withdraw
  senderAddress = '' // withdrawer address associated with Withdraw
  amount = '' // Token amount in decimals
  amountSatoshi = '' // Token amount in satoshi
  runebaseAmount = ''
  predAmount = ''
  token = '' // Token type used for Withdraw
  version = 0 // Current version of the contract. To manage deprecations later.

  constructor(withdraw) {
    Object.assign(this, withdraw);
    if (this.type === 'ESCROW') this.type = TransactionType.WITHDRAW_ESCROW;
    else this.type = TransactionType.WITHDRAW;
    this.amount = this.runebaseAmount > 0 ? this.runebaseAmount : this.predAmount;
    this.amountSatoshi = this.amount;
    this.amount = satoshiToDecimal(this.amount).toString();
    this.token = this.runebaseAmount > 0 ? Token.RUNEBASE : Token.PRED;
    this.blockTime = withdraw.block.blockTime;
    this.blockNum = withdraw.block.blockNum;
    this.senderAddress = withdraw.withdrawerAddress;
  }
}
