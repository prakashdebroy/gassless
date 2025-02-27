import React, { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import "../style.css";

const Login = ({ onLogin }) => {
  const [privateKey, setPrivateKey] = useState("");

  const handleMetamaskLogin = async () => {
    if (!window.ethereum) {
      alert("Metamask is not installed!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      onLogin(address, signer);
    } catch (error) {
      console.error("Metamask Login Failed:", error);
      alert("Failed to login with Metamask");
    }
  };

  const handlePrivateKeyLogin = () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Ganache RPC URL
      const wallet = new ethers.Wallet(privateKey, provider);
      onLogin(wallet.address, wallet);
    } catch (error) {
      console.error("Private Key Login Failed:", error);
      alert("Invalid Private Key!");
    }
  };

  return (
    <div className="login-container">
      <motion.h1 
        className="rgb-text"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        Login As
      </motion.h1>

      <button className="login-button" onClick={handleMetamaskLogin}>
        Login with MetaMask
      </button>

      <input
        type="text"
        placeholder="Enter Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        className="login-input"
      />

      <button className="login-button" onClick={handlePrivateKeyLogin}>
        Login with Private Key
      </button>
    </div>
  );
};

export default Login;
