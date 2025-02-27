require("dotenv").config();
module.exports = {
    rpcUrl: process.env.RPC_URL,
    relayerPrivateKey: process.env.RELAYER_PRIVATE_KEY,
    contractAddress: process.env.CONTRACT_ADDRESS
};
