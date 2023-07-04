const mongoose = require('../../../services/mongoose');

const WalletAddress = mongoose.model(
  'WalletAddress',
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
  },
  'walletaddresses'
);

module.exports = {
  WalletAddress,
};
