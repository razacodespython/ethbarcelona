// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {ZkBallot} from '../src/ZkBallot.sol';

contract ZkBallotScript is Script {
    function setUp() public {
    }

    function run() public {
        vm.startBroadcast();
        new ZkBallot();

      vm.stopBroadcast();
    }
}
