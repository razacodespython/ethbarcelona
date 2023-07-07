import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [addi, setPublickey] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [msg, setMsg] = useState();

  const connectButton = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    if (ethereum.isMetaMask) {
      const accounts = await provider.send("eth_requestAccounts", [])
      const { name, chainId } = await provider.getNetwork();
      setNetwork(name);
      setChainId(chainId);
      setPublickey(accounts[0]);
    } else {
      setMsg("Install MetaMask");
    }
  };
  const messages = "text"
  
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(messages),
  };

  const apiCall = async () => {
    //goes to folder
    console.log("clicked");
    const response = await fetch("/api/hello", options);
    const data = await response.json();
    console.log(data)
  };
  return (
    <>
     <h1>Hello World</h1>
     <button onClick={connectButton}>Connect Wallet</button>
     <button  type="submit" onClick={apiCall}> apicall </button>
     <p>Address: {addi}</p>
      <p>Network: {network}</p>
      <p>Chain ID : {chainId}</p>
      {msg && <p>{msg}</p>}
    </>
  )
}
