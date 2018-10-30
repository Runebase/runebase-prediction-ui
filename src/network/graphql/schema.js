import _ from 'lodash';

export const TYPE = {
  topic: 'Topic',
  oracle: 'Oracle',
  vote: 'Vote',
  syncInfo: 'SyncInfo',
  transaction: 'Transaction',
  newOrder: 'NewOrder',
};

const TYPE_DEF = {
  Topic: `
    txid
    version
    address
    name
    options
    blockNum
    status
    resultIdx
    runebaseAmount
    predAmount
    runesAmount
    funAmount
    escrowAmount
    creatorAddress
    oracles {
      version
      address
      topicAddress
      status
      token
      name
      options
      optionIdxs
      amounts
      resultIdx
      blockNum
      startTime
      endTime
      resultSetStartTime
      resultSetEndTime
      resultSetterAddress
      resultSetterQAddress
      consensusThreshold
    }
    transactions {
      type
      status
    }
  `,

  Oracle: `
    txid
    version
    address
    topicAddress
    status
    token
    name
    options
    optionIdxs
    amounts
    resultIdx
    blockNum
    startTime
    endTime
    resultSetStartTime
    resultSetEndTime
    resultSetterAddress
    resultSetterQAddress
    consensusThreshold
    transactions {
      type
      status
    }
  `,

  Vote: `
    txid
    version
    blockNum
    voterAddress
    voterQAddress
    topicAddress
    oracleAddress
    optionIdx
    amount
  `,

  NewOrder: `
    txid
    orderId
    owner
    sellToken
    buyToken
    priceMul
    priceDiv
    time
    amount
    blockNum
  `,

  SyncInfo: `
    syncBlockNum
    syncBlockTime
    syncPercent
    peerNodeCount
    addressBalances {
      address
      runebase
      pred
      fun
      exchangerunes
      exchangepred
      exchangefun
    }
  `,

  Transaction: `
    type
    txid
    status
    createdTime
    blockNum
    blockTime
    gasLimit
    gasPrice
    gasUsed
    version
    senderAddress
    receiverAddress
    topicAddress
    oracleAddress
    name
    optionIdx
    token
    amount
    topic {
      address
      name
      options
    }
  `,
};

const MUTATIONS = {
  createTopic: {
    mapping: [
      'name',
      'options',
      'resultSetterAddress',
      'bettingStartTime',
      'bettingEndTime',
      'resultSettingStartTime',
      'resultSettingEndTime',
      'amount',
      'senderAddress',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      token
      senderAddress
    `,
  },

  createBet: {
    mapping: [
      'version',
      'topicAddress',
      'oracleAddress',
      'optionIdx',
      'amount',
      'senderAddress',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      topicAddress
      oracleAddress
      optionIdx
      amount
      senderAddress
      token
    `,
  },

  setResult: {
    mapping: [
      'version',
      'topicAddress',
      'oracleAddress',
      'optionIdx',
      'amount',
      'senderAddress',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      topicAddress
      oracleAddress
      optionIdx
      amount
      senderAddress
      token
    `,
  },

  createVote: {
    mapping: [
      'version',
      'topicAddress',
      'oracleAddress',
      'optionIdx',
      'amount',
      'senderAddress',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      topicAddress
      oracleAddress
      optionIdx
      amount
      senderAddress
      token
    `,
  },

  finalizeResult: {
    mapping: [
      'version',
      'topicAddress',
      'oracleAddress',
      'senderAddress',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      oracleAddress
      senderAddress
    `,
  },

  withdraw: {
    mapping: [
      'type',
      'version',
      'topicAddress',
      'senderAddress',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      topicAddress
      senderAddress
    `,
  },

  transfer: {
    mapping: [
      'senderAddress',
      'receiverAddress',
      'token',
      'amount',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      senderAddress
      receiverAddress
      token
      amount
    `,
  },
  transferExchange: {
    mapping: [
      'senderAddress',
      'receiverAddress',
      'token',
      'amount',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      senderAddress
      receiverAddress
      token
      amount
    `,
  },
  redeemExchange: {
    mapping: [
      'senderAddress',
      'receiverAddress',
      'token',
      'amount',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      senderAddress
      receiverAddress
      token
      amount
    `,
  },
  orderExchange: {
    mapping: [
      'senderAddress',
      'receiverAddress',
      'token',
      'amount',
      'price',
      'orderType',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      senderAddress
      receiverAddress
      token
      amount
    `,
  },
  cancelOrderExchange: {
    mapping: [
      'senderAddress',
      'orderId',
    ],
    return: `
      txid
      createdTime
      version
      type
      status
      senderAddress
      receiverAddress
      token
      amount
    `,
  },
};

const ENUMS = {
  direction: [
    'ASC',
    'DESC',
  ],

  status: [
    'CREATED',
    'VOTING',
    'WAITRESULT',
    'OPENRESULTSET',
    'PENDING',
    'WITHDRAW',
    'SUCCESS',
    'FAIL',
  ],

  type: [
    'APPROVECREATEEVENT',
    'CREATEEVENT',
    'BET',
    'APPROVESETRESULT',
    'SETRESULT',
    'APPROVEVOTE',
    'VOTE',
    'FINALIZERESULT',
    'WITHDRAW',
    'WITHDRAWESCROW',
    'TRANSFER',
    'FUNDEXCHANGE',
    'REDEEMEXCHANGE',
    'RESETAPPROVE',
    'BUYORDER',
    'SELLORDER',
    'CANCELORDER',
  ],

  token: [
    'RUNES',
    'PRED',
    'FUN',
  ],
};

export function isValidEnum(key, value) {
  const isEnum = _.has(ENUMS, key);
  const isValid = _.includes(ENUMS[key], value);
  return isEnum && isValid;
}

export function getTypeDef(queryName) {
  return TYPE_DEF[queryName];
}

export function getMutation(mutationName) {
  return MUTATIONS[mutationName];
}
