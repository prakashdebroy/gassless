import React, { useState } from "react";
import Login from "./components/Login";
import CheckBalance from "./components/CheckBalance";
import SendTransaction from "./components/SendTransaction";
import GaslessTransaction from "./components/GaslessTransaction";

function App() {
  const [wallet, setWallet] = useState(null);

  return (
    <div className="App">
      {!wallet ? (
        <Login onLogin={setWallet} />
      ) : (
        <>
          <h2>Welcome! Wallet Connected</h2>
          <CheckBalance wallet={wallet} />
          <SendTransaction wallet={wallet} />
          <GaslessTransaction wallet={wallet} />
        </>
      )}
    </div>
  );
}

export default App;
