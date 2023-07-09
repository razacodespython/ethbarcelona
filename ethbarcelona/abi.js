const abi = [
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
		"name": "dummyVerify",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default abi;