const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

require("dotenv").config(); // Load private key from .env file

const app = express();
app.use(express.json());
app.use(cors());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Ganache
const relayerWallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY, provider);
const RELAYER_COMMISSION = ethers.parseEther("0.0001"); // Example commission

app.post("/relay", async (req, res) => {
  try {
    const { to, value, sender } = req.body;

    // Ensure the recipient is a valid Ethereum address
    if (!ethers.isAddress(to)) {
      return res.status(400).json({ error: "Invalid recipient address" });
    }

    // Check relayer balance
    const relayerBalance = await provider.getBalance(relayerWallet.address);
    console.log("Relayer Balance:", ethers.formatEther(relayerBalance), "ETH");

    if (relayerBalance < value + RELAYER_COMMISSION) {
      return res.status(400).json({ error: "Relayer has insufficient balance" });
    }

    // Send transaction
    const tx = await relayerWallet.sendTransaction({
      to,
      value: value - RELAYER_COMMISSION, // Deduct commission
      gasLimit: 21000,
    });

    console.log("Transaction Sent! Hash:", tx.hash);
    res.json({ txHash: tx.hash, commission: ethers.formatEther(RELAYER_COMMISSION) });
  } catch (error) {
    console.error("Relayer Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Relayer running on http://localhost:${PORT}`));
