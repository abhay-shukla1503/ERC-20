// src/components/ApproveInteraction.js
import { useState } from 'react';
import axios from 'axios';
import Navigate from "../components/Navigate";
function ApproveSpender() {
  const [to, setSpender] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const transfer = () => {
    // Send a POST request to approve tokens
    axios.post('/transfer', { to, amount })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error occurred during Transfer');
      });
  };

  return <>
  <Navigate/>
    <div>
      <h2>Transfer Token</h2>
      <div>
        <label>Transfer To:</label>
        <input type="text" value={to} onChange={(e) => setSpender(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={transfer}>Transfer Tokens</button>
      <div>{message}</div>
    </div>
  </>
}

export default ApproveSpender;
