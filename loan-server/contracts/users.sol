// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users {

    struct FinancialDetails {
        address userAddress;
        uint8 age;
        uint income_annum;
        uint cibil_score;
        uint residential_assets_value;
        uint commercial_assets_value;
        uint luxury_assets_value;
        uint bank_asset_value;
    }

    mapping(address => FinancialDetails) public users;

    address userAddress1 = 0x8e83163A57E4E7b91f7110e79b948D2dbCEcF078;
    address userAddress2 = 0x2eD26987bf37A162EaaA3D4c3Ee2D56ccdE54e92;
    address userAddress3 = 0xC9845f7EBC52e5173059939caa662946ddb1029C;

    constructor() {
        users[userAddress1] = FinancialDetails(userAddress1, 25, 1000000, 800, 100000, 100000, 100000, 100000);
        users[userAddress2] = FinancialDetails(userAddress2, 16, 1000000, 800, 100000, 100000, 100000, 100000);
        users[userAddress3] = FinancialDetails(userAddress3, 30, 100000, 600, 105040, 142030, 121212, 123123);
    }

    function getUserDetails(address _userAddress) public view returns(FinancialDetails memory) {
        return users[_userAddress];
    }

    function verifyAge(address _userAddress) public view returns(bool) {
        return users[_userAddress].age >= 18;
    }
}
