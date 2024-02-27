

const LoanContract = artifacts.require("LoanContract");

let contractAddress;

module.exports = async function(deployer) {
    await deployer.deploy(LoanContract);
    const deployedContract = await LoanContract.deployed();
    contractAddress = deployedContract.address;
    console.log(contractAddress);
};

