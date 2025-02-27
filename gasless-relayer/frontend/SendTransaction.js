import React, { useState } from "react";
import { ethers } from "ethers";

function GaslessTransaction() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const sendTransaction = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount)
      });
      setTransactionHash(tx.hash);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <div>
      <h2>Send Gasless Transaction</h2>
      <input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={sendTransaction}>Send</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
}

export default GaslessTransaction;