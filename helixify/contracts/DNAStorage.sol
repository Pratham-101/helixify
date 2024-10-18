 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract DNAStorage {
    struct DNAData {
        string dnaHash;
        bool exists;
    }

    mapping(address => DNAData) private dnaRecords;

    event DNAStored(address indexed user, string dnaHash);

    function storeDNA(string memory _dnaHash) public {
        require(!dnaRecords[msg.sender].exists, "DNA already stored.");
        dnaRecords[msg.sender] = DNAData(_dnaHash, true);
        emit DNAStored(msg.sender, _dnaHash);
    }

    function getDNA() public view returns (string memory) {
        require(dnaRecords[msg.sender].exists, "No DNA stored.");
        return dnaRecords[msg.sender].dnaHash;
    }
}
