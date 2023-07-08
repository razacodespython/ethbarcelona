// import Safe from '@safe-global/safe-core-sdk';
// import SafeApiKit from '@safe-global/api-kit';
import { ethers } from 'ethers';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'; //dropped Safe import
import dotenv from 'dotenv';

dotenv.config({ path: `.env.goerli` });

const networkConfig = process.env;

const safeAddress = networkConfig.SAFE_ADDRESS; // Goerli testnet
const guardAddress = networkConfig.GUARD_ADDRESS; //debug tx guard
const txServiceUrl = networkConfig.TX_SERVICE_URL;

const setup = async () => {
  //setup wallet: TODO: Does this need to be a signer on the safe?
  const provider = new ethers.providers.JsonRpcProvider(networkConfig.RPC_URL); //1
  const signerWallet = new ethers.Wallet(networkConfig.PRIVATE_KEY, provider); //2
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signerWallet,
  }); //3

  //   const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapter });

  //   const ethAdapter = await Safe.createDefaultEthAdapter();
  const safeSdk = await Safe.default.create({
    ethAdapter,
    safeAddress,
  });

  // const safeTransaction = await safeSdk.createEnableGuardTx(guardAddress);
  // const txResponse = await safeSdk.executeTransaction(safeTransaction);
  // await txResponse.transactionResponse?.wait();

  const a = await safeSdk.getGuard();

  console.log(a);
};

setup();
