// Proposal:
// name
// id
// voteCount
// voteDirection
// nullifiers


// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


interface IUltraVerifier {
  function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

/** 
 * @title ZkBallot
 * @dev Implements voting process along with vote delegation
 */
contract ZkBallot {


    struct Election {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        string name;   // short name (up to 32 bytes)
	// uint32 id; // unique identifier
        uint voteCount; // number of accumulated votes
	int voteBalance; // cumulative sum of votes, where yes is 1, no is -1.
	// bytes32[] nullifiers;
	uint32 quorum; // number of votes needed to pass
	bytes32 merkleRoot; //merkle root of tree containing all voters
    }
    
//     Election[] public elections; //election.id is the index of the proposal in this array

    mapping(bytes32 => Election) public elections; // id -> election TODO: Drop for txHash only but requires prover changes.
	mapping(bytes32 => bool) nullifiers;
	mapping(bytes32 => bytes32) public txHashToElectionId;

    function vote(bytes calldata _proof, bytes32[] calldata _publicInputs) public {

        // require(elections.length > 0, "No proposals exist."); // for array version
        // require(elections.length > _electionId, "This proposal does not exist."); // for array version
	
	bool validProof = verifyProof(_proof, _publicInputs);
	require(validProof, "This proof is not valid.");

	Election storage election = elections[_publicInputs[1]];

	// check if nullifier has been used, add to mapping if not.
	// TODO: convert proof bytes to structured data
	require(!nullifiers[_publicInputs[3]], "This proof has already been used.");
	nullifiers[_publicInputs[3]] = true;

	uint(_publicInputs[2]) > 0 ? election.voteBalance++ : election.voteBalance--;
	election.voteCount++;
    }

    function verifyProof(bytes calldata _proof, bytes32[] calldata _publicInputs) public view returns (bool){
	// If item passed is parsed, need to change _proof to memory, not calldata
	//goerli
	// bool result = IUltraVerifier(0x3172a66630BE2BE7d02f38d53dc038A090B82eA7).verify(_proof, _publicInputs);
	//gnosis
	bool result = IUltraVerifier(0xE249C59F4c5A0Dd8b0Fe1610e25b4ECA3A2fc74a).verify(_proof, _publicInputs);

	return result;
    }

    function checkElectionSuccess(bytes32 _txHash) public view returns (bool){

	bool result = true;
	//// Check vote hit quorum and if election.voteBalance > 0
	// require(elections[_electionId].voteCount >= 1, "At least 1 vote required.");
	// require(elections[_electionId].voteCount >= elections[_electionId].quorum, "Quorum not met.");
	// require(elections[_electionId].voteBalance > 0, "Vote balance not positive.");

	bytes32 electionId = txHashToElectionId[_txHash];

	result = result && elections[electionId].voteCount >= 1;
	result = result && elections[electionId].voteCount >= elections[electionId].quorum;
	result = result && elections[electionId].voteBalance > 0;

	return result;
    }

    function electionExists(bytes32 _txHash) public view returns (bool){
	return txHashToElectionId[_txHash] != 0;
    }

	// returns voteCount, voteBalance and quorum for a given election
    function getVoteInfo(bytes32 _txHash) public view returns (uint, int, uint32){
	bytes32 electionId = txHashToElectionId[_txHash];
	return (elections[electionId].voteCount, elections[electionId].voteBalance, elections[electionId].quorum);
    }

    function createElection(string calldata _name, uint32 _quorum, bytes32 _id, bytes32 _txHash, bytes32 _merkleRoot) public {
	// create the elction and return id as a uint32
	//mapping(bytes32 => bool) storage emptyNullifiers;
	Election memory newElection = Election(_name, 0, 0, _quorum, _merkleRoot); 

	// elections.push(newElection); //array
	// elections[_txHash] = newElection; //mapping

	txHashToElectionId[_txHash] = _id;
	elections[_id] = newElection; //testing

	return;
    }
}