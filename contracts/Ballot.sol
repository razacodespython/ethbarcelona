// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements zkVoting process
 */
contract Ballot {
    address public chairperson; // this could be the zkp verifier contract; this contract's deployer

    uint public quorumInFavour;
    uint public votesInFavour = 0;
    uint public votesAgainst = 0;
    uint public votesAbstaining = 0;

    bytes32[] public nullifiers;

    /** 
     * @dev Create a new ballot
     * @param quorumInFavour_ the minimum number of yes-votes (0) for the ballot to be deemed accepted; 
     *   can be expanded to support other proposal types (no (1), abstain (2))
     */
    constructor(uint quorumInFavour_) {
        chairperson = msg.sender;
        quorumInFavour = quorumInFavour_;
    }

    /**
     * @dev Give your vote
     * @param proposalType 0 to vote for yes, 1 for no, 2 for abstain
     */
    function vote(uint8 proposalType, bytes32 zkProof, bytes32 nullifier) public {

        for (uint i=0; i<nullifiers.length; i++) {
            if (nullifiers[i]==nullifier) {
                revert("Voter has already voted");
            }
        }
        
        bool zkProofIsValid = true; /* TODO: Verify zkProof using generated verifier contract */
        if (!zkProofIsValid) {
            revert("Provided zkProof is not valid");
        }

        nullifiers.push(nullifier);

        if (proposalType==0) {
            votesInFavour++;
        }
        if (proposalType==1) {
            votesAgainst++;
        }
        if (proposalType==2) {
            votesAbstaining++;
        }
    }

    function ballotWasAccepted() public view 
        returns (bool accepted) 
        {
            return votesInFavour >= quorumInFavour;
        }
}
