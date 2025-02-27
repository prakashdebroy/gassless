import React, { useState } from "react";
import { ethers } from "ethers";

const SendTransaction = ({ wallet }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const sendTransaction = async () => {
    try {
      let provider;
      let signer;

      if (wallet?.privateKey) {
        // Use Ganache if logged in with Private Key
        provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        signer = new ethers.Wallet(wallet.privateKey, provider);
      } else if (window.ethereum) {
        // Use MetaMask provider if connected via MetaMask
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      } else {
        alert("No valid provider found!");
        return;
      }

      console.log("Sending transaction from:", await signer.getAddress());
      console.log("Using provider:", provider.connection?.url || "MetaMask");

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      alert(`Transaction Sent! Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Failed to send transaction.");
    }
  };

  return (
    <div>
      <h3>Send ETH</h3>
      <input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <input type="text" placeholder="Amount (ETH)" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={sendTransaction}>Send</button>
    </div>
  );
};

export default SendTransaction;
