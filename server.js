// mongodb+srv://uniqueomokenny:<password>@cluster0-yyj8w.mongodb.net/test?retryWrites=true&w=majority
let tokens = [{
    id: "77839"
  },
  {
    id: "90081"
  },
  {
    id: "11266"
  },
]

const _ = require('lodash');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const FundTransactionBlockchain = require('./block/transBlockchain');
const uuid = require('uuid/v1');

const transactionID = uuid().split('-').join('');

const fund = new FundTransactionBlockchain();


// @route GET api/blockchain
// @desc: get entire blockchain endpoint
// @access Public
app.get('/blockchain', (req, res) => {
  res.send(fund)
});


// @route POST api/transaction
// @desc: Create Create New Transaction
// @access Public
app.post('/api/transaction', (req, res) => {
  const amount = req.body.amount;
  const sender = req.body.sender;
  const recipient = req.body.recipient;

  const blockIndex = fund.createNewTransaction(amount, sender, recipient);
  const token = _.sample(tokens)
  console.log(token)
  res.json({
    note: `Fund transaction will be added in block ${blockIndex}.`,
    token: `Your token is ${token.id}`
  });
});


// @route POST api/confirm-trans
// @desc: Validate your transaction with the token
// @access Public
app.post('/confirm-trans', (req, res) => {
  const lastFundBlock = fund.getLastFundTransactionBlock();
  const prevHash = lastFundBlock['hash'];
  const currentFundData = {
    transactions: fund.pendingFundTrans,
    index: lastFundBlock['index'] + 1
  }

  const token = req.body.token;

  if (_.find(tokens, {
      id: token
    })) {
    const hash = fund.hashTransactionBlock(prevHash, currentFundData, token);

    const newFundBlock = fund.createNewTransactionBlock(token, prevHash, hash);

    res.json({
      note: "Fund sent successfully",
      block: newFundBlock
    })
  } else {
    res.json({
      error: "Invalid token",
    })
  }
});

const PORT = 4000 || env.process.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})