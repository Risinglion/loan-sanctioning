import Web3 from 'web3';
import dotenv from 'dotenv';
import contract from './build/contracts/LoanContract.json' assert { type: "json" };

dotenv.config();

// Creating a new instance of Web3 to my Ganache local testnet
const web3 = new Web3(process.env.GANACHE_URL);

// Checking if the connection to the blockchain is successful
await web3.eth.net.isListening()
        .then(() => {
                console.log('Connected to the blockchain');
        })
        .catch((error) => {
                console.error('Failed to connect to the blockchain:', error);
        });

// Adding the account I consider as loan lender to the wallet
const account = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY); 

//Function to send the loan amount to the client (amouunt, clientAddress as parameters) received from the frontend
async function sendLoanAmount(amount, clientAddress){
        const contractInstance = new web3.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS);
        await contractInstance.methods.sendLoan(amount, clientAddress).send({ from: account[0].address })
                .then(async (response) => {
                        const tx = {
                                from: account[0].address,
                                to: clientAddress,
                                value: web3.utils.toWei(amount, 'ether'),
                        };
                        const txReceipt = await web3.eth.sendTransaction(tx);
                        console.log("Transaction Receipt : ",txReceipt);
                })
                .catch((error) => {
                        console.error('Failed to send the loan amount:', error);
                }
        );
        
}

// export { sendLoanAmount };


sendLoanAmount(1, '0x2eD26987bf37A162EaaA3D4c3Ee2D56ccdE54e92');




        