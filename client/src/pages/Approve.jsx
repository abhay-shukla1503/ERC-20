// src/components/ApproveInteraction.js
import { useState } from 'react';
import axios from 'axios';
import Navigate from "../components/Navigate";
function ApproveSpender() {
  const [spender, setSpender] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleApprove = () => {
    // Send a POST request to approve tokens
    axios.post('/approve', { spender, amount })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error occurred during approval');
      });
  };

  return <>
  <Navigate/>
    <div>
      <h2>Approve Spender</h2>
      <div>
        <label>Spender Address:</label>
        <input type="text" value={spender} onChange={(e) => setSpender(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={handleApprove}>Approve Tokens</button>
      <div>{message}</div>
    </div>
  </>
}

export default ApproveSpender;
