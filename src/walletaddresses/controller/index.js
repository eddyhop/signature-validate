const { ethers } = require('ethers');
const schemes = require('../models/mongoose');

module.exports.verifyTransaction = async (req, res) => {
  const { signature, walletAddress, text } = req.body;

  try {
    const signerAddr = ethers.verifyMessage(text, signature);

    if (walletAddress.toLowerCase() === signerAddr.toLowerCase()) {
      const oldAddress = await schemes.WalletAddress.findOne({
        address: walletAddress,
      });
      if (oldAddress) {
        return res
          .status(400)
          .json({ result: 'valid signature', msg: 'Address is already saved' });
      }
      const newAddr = schemes.WalletAddress({
        address: walletAddress,
      });

      try {
        await newAddr.save();
        res.status(201).json({ result: 'success' });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: error,
        });
      }
    } else {
      return res.status(401).json({ result: 'signature is invalid' });
    }
  } catch (error) {
    return res.status(401).json({ result: 'signature is invalid' });
  }

  return res.json({});
};
