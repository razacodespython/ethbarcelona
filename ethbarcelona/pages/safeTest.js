import { useState } from 'react';
import { ethers } from 'ethers';
import SafeApiKit from '@safe-global/api-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';

const safeAddress = '0x7ace1Be0FE5E4016706e005e4785cb43B2daF4F8';
const txServiceUrl = 'https://safe-transaction-gnosis-chain.safe.global';

export default function Home() {
  const [addi, setPublickey] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [msg, setMsg] = useState();
  const [provider, setProvider] = useState();
  const [safeTxHash, setSafeTxHash] = useState();

  const createElectionButton = async () => {
    // call the createElection method
    // _id should be an int
    // _txHash should be safeTxHash
    // TODO: address of this contract (ZkElection thing)
    // function createElection(string calldata _name, uint32 _quorum, bytes32 _id, bytes32 _txHash, bytes32 _merkleRoot) public {
  };

  const connectButton = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    // allow this to be accessed by entire component
    setProvider(provider);
    console.log(provider);

    if (ethereum.isMetaMask) {
      const accounts = await provider.send('eth_requestAccounts', []);
      const { name, chainId } = await provider.getNetwork();
      setNetwork(name);
      setChainId(chainId);
      setPublickey(accounts[0]);

      // Start Safe stuff!
      const signer = provider.getSigner(0);
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      console.log(ethAdapter);
      const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
      // grab the txs in the safe's queue
      const pendingTxs = await safeService.getPendingTransactions(safeAddress);
      // grab the next tx (assuming this is 0, but only one tx is present to test)
      const safeTx = await safeService.getTransaction(
        pendingTxs?.results[0].safeTxHash
      );
      console.log(safeTx);
      // save state to use outside this scope
      setSafeTxHash(safeTx.safeTxHash);

      // init safeSDK
      const safeSdk = await Safe.create({ ethAdapter, safeAddress });
      // check if the queued tx is "Valid" -- it won't be if Election doesn't exist or proof doesn't pass
      // should revert and be false if Election doesn't exist
      const isValidTx = await safeSdk.isValidTransaction(safeTx);
      console.log(isValidTx);

      // execute tx is here, but I haven't tested it.
      // https://github.com/safe-global/safe-core-sdk/blob/main/guides/integrating-the-safe-core-sdk.md#8-execute-the-transaction
      //
      // const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
      // const receipt = executeTxResponse.transactionResponse && (await executeTxResponse.transactionResponse.wait())
    } else {
      setMsg('Install MetaMask');
    }
  };
  const messages = 'text';

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(messages),
  };

  const apiCall = async () => {
    //goes to folder
    console.log('clicked');
    const response = await fetch('/api/hello', options);
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <h1>Hello World</h1>
      <button onClick={connectButton}>Connect Wallet</button>
      <button type="submit" onClick={apiCall}>
        {' '}
        apicall{' '}
      </button>
      <p>Address: {addi}</p>
      <p>Network: {network}</p>
      <p>Chain ID : {chainId}</p>
      {msg && <p>{msg}</p>}
    </>
  );
}
