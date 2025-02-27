import React, { useState } from "react";
import { ethers } from "ethers";

function CheckBalance() {
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");

  const checkBalance = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
    const bal = await provider.getBalance(address);
    setBalance(ethers.utils.formatEther(bal));
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <input type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={checkBalance}>Check</button>
      {balance && <p>Balance: {balance} ETH</p>}
    </div>
  );
}

export default CheckBalance;