const crypto = require('crypto');


class FundTransactionBlockchain {
  constructor() {
    this.chain = [];
    this.pendingFundTrans = [];

    // Genesis Block
    this.createNewTransactionBlock(0, '0000', '0000');

  }


  hashTransactionBlock(prevHash, currentFundData, token) {
    const dataString = prevHash + token.toString() + JSON.stringify(currentFundData);
    const hash = crypto.createHash('sha256');
    hash.update(dataString);

    return hash.digest('hex');
  }


  createNewTransactionBlock(token, prevHash, hash) {
    const newTransBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingFundTrans,
      token,
      hash,
      prevHash
    }

    this.pendingFundTrans = [];
    this.chain.push(newTransBlock);

    return newTransBlock;
  }


  getLastFundTransactionBlock() {
    return this.chain[this.chain.length - 1];
  }


  createNewTransaction(amount, sender, recipient) {
    const newFundTran = {
      amount,
      sender,
      recipient
    };

    this.pendingFundTrans.push(newFundTran);

    return this.getLastFundTransactionBlock()['index'] + 1;
  }

}

module.exports = FundTransactionBlockchain;