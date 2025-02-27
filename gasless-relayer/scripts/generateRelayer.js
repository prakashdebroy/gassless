const { ethers } = require("ethers");

async function createRelayerWallet() {
  const wallet = ethers.Wallet.createRandom();
  
  console.log("Relayer Address:", wallet.address);
  console.log("Private Key (Store securely!):", wallet.privateKey);
}

createRelayerWallet();
