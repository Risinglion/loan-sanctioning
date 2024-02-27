// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract LoanContract {

    address payable public admin;
    mapping(address => uint) public loans;

    constructor() {
        admin = payable(msg.sender);
    }

    function sendLoan(uint amount,address client ) public {
        require(loans[client] == 0, "Loan already sent");
        loans[client] = amount;
    }


}