// const sha256 = require('sha256');
const crypto = require('crypto');

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');
  hash.update(inputs.sort().join(" "));
  return hash.digest('hex');
}

class TransactionBlock {
  constructor(index, timestamp, prevHash, transData) {
    this.index = index;
    this.timestamp = timestamp;
    this.transData = transData;
    this.prevHash = prevHash;
    this.hash = cryptoHash(timestamp, prevHash, transData, index)
  }


  static transGenesisBlock() {
    return new TransactionBlock(0, Date.now(), "0000", "Mr. Sola O. sends $70 --> Mr. Buhari A.");
  }

  static newTransBlock(lastTransBlock, transData) {
    return new TransactionBlock(lastTransBlock.index + 1, Date.now(), lastTransBlock.hash, transData);
  }

}

module.exports = TransactionBlock;