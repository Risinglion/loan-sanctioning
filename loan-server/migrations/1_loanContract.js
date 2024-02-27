

const LoanContract = artifacts.require("LoanContract");


module.exports = async function(deployer) {
    await deployer.deploy(LoanContract);
    const deployedContract = await LoanContract.deployed();
    contractAddress = deployedContract.address;
    console.log(contractAddress);
};

