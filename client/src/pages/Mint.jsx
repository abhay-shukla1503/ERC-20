// src/components/TokenInteraction.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Navigate from "../components/Navigate";
function TokenInteraction() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch token name and symbol when the component loads
    axios.get('/token-info')
      .then((response) => {
        const { name, symbol } = response.data;
        setName(name);
        setSymbol(symbol);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMint = () => {
    // Send a POST request to mint tokens
    axios.post('/mint', { to, amount })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error occurred during minting');
      });
  };

  return <>
  <Navigate/>
    <div>
      <h2>MINT</h2>
      <div>
        <p>Token Name: {name}</p>
        <p>Token Symbol: {symbol}</p>
      </div>
      <div>
        <label>Recipient Address:</label>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={handleMint}>Mint Tokens</button>
      <div>{message}</div>
    </div>
  </>
}

export default TokenInteraction;
