import { ethers } from 'ethers';
require('dotenv').config();


// Begin of GET PUBLIC INPUTS
const { readFile } = require('fs/promises')

async function getPublicInputs() {  
  const verifierTomlStr = await readFile('./Verifier.toml', 'utf8')
  var toml = require('toml');
  var verfierTomlData = toml.parse(verifierTomlStr);
  return [
    "" + verfierTomlData["root"],
    "" + verfierTomlData["proposalId"],
    "" + verfierTomlData["vote"],
    "" + verfierTomlData["return"]
  ]
}

async function getProof() {  
  const proofStr = await readFile('./proofs/p.proof', 'utf8')
  return "0x" + proofStr
}


  var proof = await getProof()
  var publicInputs = await getPublicInputs()
  console.log(proof)
  console.log(publicInputs)

// End of GET PUBLIC INPUTS
const abi = [
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txHash",
          "type": "bytes32"
        }
      ],
      "name": "checkElectionSuccess",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint32",
          "name": "_quorum",
          "type": "uint32"
        },
        {
          "internalType": "bytes32",
          "name": "_id",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_txHash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_merkleRoot",
          "type": "bytes32"
        }
      ],
      "name": "createElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txHash",
          "type": "bytes32"
        }
      ],
      "name": "electionExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "elections",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "voteBalance",
          "type": "int256"
        },
        {
          "internalType": "uint32",
          "name": "quorum",
          "type": "uint32"
        },
        {
          "internalType": "bytes32",
          "name": "merkleRoot",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txHash",
          "type": "bytes32"
        }
      ],
      "name": "getVoteInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        },
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "txHashToElectionId",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_proof",
          "type": "bytes"
        },
        {
          "internalType": "bytes32[]",
          "name": "_publicInputs",
          "type": "bytes32[]"
        }
      ],
      "name": "verifyProof",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_proof",
          "type": "bytes"
        },
        {
          "internalType": "bytes32[]",
          "name": "_publicInputs",
          "type": "bytes32[]"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export default async function handler (req, res){
    console.log(abi)
    const privateKey = process.env.PRIVATE_KEY;
    console.log(privateKey)
    const VERIFIER_CONTRACT_ADDRESS = '0xEce86f082E7f11525886D4c9B6B04b5875DE381e';
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.gnosischain.com'); // Replace with your Ethereum network URL
    const signer = new ethers.Wallet(privateKey, provider);
    const contractVerify = new ethers.Contract(VERIFIER_CONTRACT_ADDRESS, abi, signer);
    const verify = await contractVerify.vote(proof,publicInputs)

    const response={"message":"voted!"}
    res.send(response)

}