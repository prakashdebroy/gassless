const ethers = require("ethers");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { verifyMetaTransaction, forwardMetaTransaction } = require("./utils");

const app = express();
app.use(bodyParser.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const relayerWallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY, provider);
const contractABI = require("./smartContractABI.json");
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, provider);

app.post("/relay", async (req, res) => {
    try {
        const { userAddress, functionData, nonce, signature } = req.body;
        if (!verifyMetaTransaction(userAddress, functionData, nonce, signature)) {
            return res.status(400).json({ error: "Invalid meta-transaction" });
        }
        const tx = await forwardMetaTransaction(relayerWallet, contract, userAddress, functionData, nonce);
        await tx.wait();
        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        console.error("Relayer error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Relayer running on port ${PORT}`));
