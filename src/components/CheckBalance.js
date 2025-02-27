import React, { useState } from "react";
import { ethers } from "ethers";

const CheckBalance = ({ wallet }) => {
  const [balance, setBalance] = useState(null);

  const fetchBalance = async () => {
    try {
      let provider;

      if (wallet?.privateKey) {
        // Use Ganache if logged in with Private Key
        provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      } else if (window.ethereum) {
        // Use MetaMask provider if connected via MetaMask
        provider = new ethers.BrowserProvider(window.ethereum);
      } else {
        alert("No valid provider found!");
        return;
      }

      const address = wallet.address || (wallet.getAddress && await wallet.getAddress());

      console.log("Fetching balance for:", address);
      console.log("Using provider:", provider.connection?.url || "MetaMask");

      const balanceWei = await provider.getBalance(address);
      setBalance(ethers.formatEther(balanceWei));
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Failed to fetch balance.");
    }
  };

  return (
    <div>
      <h3>Check Balance</h3>
      <button onClick={fetchBalance}>Get Balance</button>
      {balance !== null && <p>Balance: {balance} ETH</p>}
    </div>
  );
};

export default CheckBalance;
