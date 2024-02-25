const LoanContract = artifacts.require("LoanContract");

module.exports = async function(deployer) {
    await deployer.deploy(LoanContract);
    const deployedContract = await LoanContract.deployed();
    module.exports.contractAddress = deployedContract.address;
};
