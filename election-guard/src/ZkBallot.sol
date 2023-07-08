// Proposal:
// name
// id
// voteCount
// voteDirection
// nullifiers


// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title ZkBallots
 * @dev Implements voting process along with vote delegation
 */
contract ZkBallots {

    struct Election {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;   // short name (up to 32 bytes)
	// uint32 id; // unique identifier
        uint voteCount; // number of accumulated votes
	int voteBalance; // cumulative sum of votes, where yes is 1, no is -1.
	// bytes32[] nullifiers;
	mapping(bytes32 => bool) nullifiers;
    }
    
    Election[] public elections; //election.id is the index of the proposal in this array

    /**
     * @dev Give your vote to proposal 'proposals[id].name'.
     * @param proposal index of proposal in the proposals array
     * TODO: Convert to ZK - only tally the sum
     */
    function vote(uint32 _electionId, bytes calldata _proof) public {

        require(elections.length > 0, "No proposals exist.");
        require(elections.length > _electionId, "This proposal does not exist.");
	
	bool validProof = verifyProof(_proof);

	Election storage election = elections[_electionId];

	// check if nullifier has been used, add to mapping if not.
	// TODO: convert proof bytes to structured data
	require(election.nullifiers[_proof.nullifier], "This proof has already been used.");
	election.nullifiers.push(_proof.nullifier);

	_proof.vote ? election.voteBalance++ : election.voteBalance--;
	election.voteCount++;
    }

    function verifyProof(bytes calldata _proof) private returns (bool){
	//TODO: Call verification contract.
	// If item passed is parsed, need to change _proof to memory, not calldata
    }

}