import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const GaslessTransaction = ({ wallet }) => {
  const [recipient, setRecipient] = useState("");
  const [commission, setCommission] = useState(null);
  const [error, setError] = useState(null);

  const sendGaslessTransaction = async () => {
    try {
      let provider;
      let sender;

      if (wallet?.privateKey) {
        // Using Ganache for Private Key login
        provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        sender = new ethers.Wallet(wallet.privateKey, provider);
      } else if (window.ethereum) {
        // Using MetaMask
        provider = new ethers.BrowserProvider(window.ethereum);
        sender = await provider.getSigner();
      } else {
        throw new Error("No valid provider found!");
      }

      const senderAddress = await sender.getAddress();
      console.log("Sending from:", senderAddress);

      // Ensure recipient is a valid Ethereum address
      if (!ethers.isAddress(recipient)) {
        throw new Error("Invalid recipient address!");
      }

      // Fetch relayer commission
      const response = await fetch("http://localhost:5000/relay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipient,
          value: ethers.parseEther("0.01").toString(), // Send 0.01 ETH
          sender: senderAddress,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Transaction failed");
      }

      alert(`Gasless Transaction Sent! Hash: ${data.txHash}`);
      setCommission(data.commission);
      setError(null);
    } catch (error) {
      console.error("Transaction Error:", error);
      setError(error.message);
      alert("Transaction Failed: " + error.message);
    }
  };

  return (
    <div>
      <h3>Gasless Transaction</h3>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <button onClick={sendGaslessTransaction}>Send Gasless TX</button>

      {commission && <p>Relayer Commission: {commission} ETH</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GaslessTransaction;
