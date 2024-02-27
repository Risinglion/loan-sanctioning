import Web3 from 'web3';
import dotenv from 'dotenv';
import fs from 'fs';
import solc from 'solc';
import _loanContract from './build/contracts/LoanContract.json' assert { type: "json" };


dotenv.config();

let defaultAccount = '0xA22A8D90699231F5c02ce857F37Fc4e95571d1c7';
let contractAddress;

const web3 = new Web3(process.env.GANACHE_URL);

async function sendLoanAmount(amount, clientAddress){
    
        // Uncomment the below lines later

        // const contractInstance = new web3.eth.Contract(contract.abi, contractAddress);
        // contractInstance.methods.sendLoan(amount, clientAddress);
    const tx = { 
        from: defaultAccount,
        to: clientAddress, 
        value: web3.utils.toWei(amount, 'ether')
    };
    return tx;
        
}

async function deployContract() {

    let contract = new web3.eth.Contract(_loanContract.abi);

    await web3.eth.getAccounts().then((accounts) => {
        defaultAccount = accounts[0];
        console.log("Default Account:", defaultAccount);  //to deploy the contract from default Account
        contract
            .deploy({ data: _loanContract.bytecode })
            .send({ from: defaultAccount, gas: 470000 })
            .on("receipt", (receipt) => { //event,transactions,contract address will be returned by blockchain
                contractAddress = receipt.contractAddress;
                console.log("Contract Address:", contractAddress);
            })
    });
}

await deployContract();

sendLoanAmount(1, '0x8e83163A57E4E7b91f7110e79b948D2dbCEcF078')
        .then(async (tx) => {
            const txReceipt = await web3.eth.sendTransaction(tx);
            console.log("Transaction Receipt : ",txReceipt);
        })
        .catch((error) => {
                console.error(error);
        });