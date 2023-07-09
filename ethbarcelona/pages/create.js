import { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0xEce86f082E7f11525886D4c9B6B04b5875DE381e';
const contractABI = [
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
	},
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
	}
];

const Create = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    quorum: '',
    id: '',
    txHash: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleCreateElection = async () => {
    // Perform an action with the input values
    console.log('Input values:', inputValues);

    try {
       console.log("uno")
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
         // Request access to the user's MetaMask account
         await window.ethereum.request({ method: 'eth_requestAccounts' });
         
         // Connect to the Ethereum network using MetaMask provider
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         
         // Create a new instance of the contract using the contract address and ABI
         const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
         
         // Call the contract function
         const id32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(parseInt(inputValues.id)), 32);
         const txHash32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(inputValues.txHash), 32);
         console.log(id32)
         const merkleRoot = "0x01604aca52c71e9a07bc5c317a6e8b6caa1e34f20039139fa69cf9e13a02118c"
         const result = await contract.createElection(
            inputValues.name,
            inputValues.quorum,
            id32,
            txHash32,
            merkleRoot,
         );
         
         // Process the result
         console.log('Contract result:', result);
         /*
        */
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };

  return (
    <div>
      <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="quorum">Quorum:</label>
          <input
            type="text"
            id="quorum"
            name="quorum"
            value={inputValues.quorum}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="id">Id:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={inputValues.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="txHash">Safe Transaction Hash:</label>
          <input
            type="text"
            id="txHash"
            name="txHash"
            value={inputValues.txHash}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" onClick={handleCreateElection}>Submit</button>
    </div>
  );
};

export default Create;