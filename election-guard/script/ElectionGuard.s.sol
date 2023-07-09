// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {DebugTransactionGuard} from '../src/ElectionGuard.sol';

contract GuardScript is Script {
    function setUp() public {
    }

    function run() public {
        vm.startBroadcast();
        new DebugTransactionGuard();


      vm.stopBroadcast();
    }
}
