//import React from "react";
import PropTypes from 'prop-types';
import Web3 from "web3";
import ABI from "./ABI.json";
import { useNavigate } from 'react-router-dom';

const Wallet = ({saveState}) => {
    const navigateTo = useNavigate();
  const connectwallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        const contractAddress = "0x7D3AEfa484C43D78c8f3BE6521A0578Ea5038A36";
        const contract = new web3.eth.Contract(ABI,contractAddress);
        saveState({web3:web3,contract:contract,account:accounts[0]})
        navigateTo("/mint")
      } else {
        throw new Error("Ethereum provider not available.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="wallet_header">
      <span>Welcome To</span> <p>ERC-20</p>
      </div>
      <div className='connect_wallet_section todo_btn'>
        <p>Please Connect Metamask Wallet To Access The App</p>
    <button onClick={() => connectwallet()}>Connect Wallet</button>
    </div> 
    </>
  );
};

Wallet.propTypes = {
    saveState: PropTypes.func.isRequired,
};

export default Wallet;
