const express = require('express');
const cors = require("cors");
const ABI = require('./ABI.json');
const {Web3} = require("web3"); 

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3("https://rpc.notadegen.com/eth/sepolia");
const contractAddress = "0x7D3AEfa484C43D78c8f3BE6521A0578Ea5038A36";
const contract = new web3.eth.Contract(ABI, contractAddress);
const privateKey = '37b0abb593520621efb356e310e682ba34082b3d4bbb8ea35fc463c38120f2fd';
const ownerAddress = '0x6d77FA0c0cc1181ba128a25e25594f004e03a141';


app.get('/token-info', async (req, res) => {
  try {
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    res.json({ name, symbol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/mint', async (req, res) => {
  try {
    const { to, amount } = req.body;

    const transactionObject = {
      from: ownerAddress,
      to: contractAddress, 
      gas: 100000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
      nonce: await web3.eth.getTransactionCount(ownerAddress,'latest'),
      data: contract.methods.mint(to, amount).encodeABI(),
    };

    // Sign the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);

    // Send the signed transaction
    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      .on('transactionHash', (hash) => {
        console.log(`Transaction hash: ${hash}`);
        res.json({ message: `${amount} tokens minted to ${to}`, transactionHash: hash });
      })
      .on('receipt', (receipt) => {
        console.log('Transaction receipt:', receipt);
      })
      .on('error', (error) => {
        console.error('Transaction error:', error);
        res.status(500).json({ error: `Transaction error: ${error.message}` });
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//transaction hash:-0x9ee416d20b63542605a5a9199d20f4ac6d26b8c65239e338cf13df87e9729805

app.post('/approve', async (req, res) => {
  //approve address:-0x21A084D4f043646fe2432E6a3b18e2Cbfc216f25
  try {
    const { spender, amount } = req.body;
    const senderAddress = '0x6d77FA0c0cc1181ba128a25e25594f004e03a141'; // Replace with the sender's address
    const data = contract.methods.approve(spender, amount).encodeABI();
    const gas = 20000; // Adjust the gas limit as needed
    const gasPrice = web3.utils.toWei('10', 'gwei'); // Set your desired gas price

    const nonce = await web3.eth.getTransactionCount(senderAddress);

    const tx = {
      from: senderAddress,
      to: contractAddress,
      value: '0',
      gas: 21572,
      gasPrice: web3.utils.toWei('10', 'gwei'),
      nonce: await web3.eth.getTransactionCount(ownerAddress),
      data: contract.methods.approve(spender, amount).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      .on('transactionHash', (hash) => {
        console.log(`Transaction hash: ${hash}`);
        res.json({ message: `Approved ${amount} tokens for ${spender}`, transactionHash: hash });
      })
      .on('receipt', (receipt) => {
        console.log('Transaction receipt:', receipt);
      })
      .on('error', (error) => {
        console.error('Transaction error:', error);
        res.status(500).json({ error: `Transaction error: ${error.message}` });
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// transaction hash:-0x504a8b02fdaeda0b135e43d50862ef2b86fdbbe7dd410b9156a09ea7116c5e3f

app.post('/transfer', async (req, res) => {

  //to address:-0x21A084D4f043646fe2432E6a3b18e2Cbfc216f25
  try {
    const { to, amount } = req.body;
    //const owner = await contract.methods.owner().call(); // Check if the sender is the owner or handle authorization as needed

    // You can add authorization logic here if needed
    // For example, if the sender is not the owner, you can return a 403 Forbidden response.

    const transactionObject = {
      from: ownerAddress,
      to: contractAddress,
      value: '0',
      gas: 100000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
      nonce: await web3.eth.getTransactionCount(ownerAddress),
      data: contract.methods.transfer(to, amount).encodeABI(),
    };

    // Sign the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);

    // Send the signed transaction
    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      .on('transactionHash', (hash) => {
        console.log(`Transaction hash: ${hash}`);
        res.json({ message: `${amount} tokens transferred to ${to}`, transactionHash: hash });
      })
      .on('receipt', (receipt) => {
        console.log('Transaction receipt:', receipt);
      })
      .on('error', (error) => {
        console.error('Transaction error:', error);
        res.status(500).json({ error: `Transaction error: ${error.message}` });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//transaction hash:-0xf5f6a9a5ce9586a85b286f1331693437cfd958241444aad2e656224e9a07aaff


app.post('/burn', async (req, res) => {
  try {
    const {amount} = req.body;
    console.log(amount)
    console.log(typeof amount)
    const num = Number(amount)
    const owner = await contract.methods.owner().call();

    if (owner.toLowerCase() !== ownerAddress.toLowerCase()) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const transactionObject = {
      from: ownerAddress,
      to: contractAddress,
      gas: 100000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
      nonce: await web3.eth.getTransactionCount(ownerAddress),
      data: contract.methods.burn(amount).encodeABI(),
    };

    // Sign the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);

    // Send the signed transaction
    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      .on('transactionHash', (hash) => {
        console.log(`Transaction hash: ${hash}`);
        res.json({ message: `${amount} tokens burned`, transactionHash: hash });
      })
      .on('receipt', (receipt) => {
        console.log('Transaction receipt:', receipt);
      })
      .on('error', (error) => {
        console.error('Transaction error:', error);
        res.status(500).json({ error: `Transaction error: ${error.message}` });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//transaction hash:-0x0d33b69e267ce77b378305927046157eeb7daa5ed97bf93cdbd13b68c7a3fbc2

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server Running At Port ${PORT}`);
});

