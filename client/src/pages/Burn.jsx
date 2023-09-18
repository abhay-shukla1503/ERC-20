// src/components/BurnInteraction.js
import { useState } from 'react';
import axios from 'axios';
import Navigate from "../components/Navigate";
function BurnInteraction() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleBurn = () => {
    // Send a POST request to burn tokens
    axios.post('/burn', { amount })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error occurred during burning');
      });
  };

  return <>
    <Navigate/>
    <div>
      <h2>Burn Tokens</h2>
      <div>
        <label>Amount to Burn:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={handleBurn}>Burn Tokens</button>
      <div>{message}</div>
    </div>
    </>
}

export default BurnInteraction;
