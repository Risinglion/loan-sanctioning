const UsersContract = artifacts.require("Users");

module.exports = async function(deployer) {
    await deployer.deploy(UsersContract);
    const deployedContract = await UsersContract.deployed();
    console.log(deployedContract.address);
}
