// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanContract {
    address payable public admin;
    mapping(address => uint) public loans;

    constructor() {
        admin = payable(msg.sender);
    }

    

    function sendLoan(uint amount, address client) public {
        require(address(this).balance >= amount, "Not enough funds");
        require(loans[client] == 0, "Previous loan must be repaid before a new one is granted");

        loans[client] = amount;
        payable(client).transfer(amount);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}