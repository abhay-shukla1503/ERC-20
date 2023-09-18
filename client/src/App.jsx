import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Mint from './pages/Mint'
import Approve from './pages/Approve'
import Transfer from './pages/Transfer'
import Burn from './pages/Burn'
import Wallet from './pages/Wallet';
import './App.css'

function App() {
  const [state,setState] = useState({web3:null,contract:null,account:null})

  const saveState = ({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }

    const router = createBrowserRouter([
      {path:'/',element:<Wallet saveState = {saveState}/>},
      {path:'/mint',element:<Mint state={state}/>},
      {path:'/approve',element:<Approve state={state}/>},
      {path:'/transfer',element:<Transfer state={state}/>},
      {path:'/Burn',element:<Burn state={state}/>},
    ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
