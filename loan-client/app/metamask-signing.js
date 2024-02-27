"use client"
import Web3 from 'web3'

export const collectWalletData = async () => {
    if(window.ethereum){
        console.log('MetaMask is installed')
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const web3 = new Web3(window.ethereum)
            const accounts = await web3.eth.getAccounts()
            console.log(accounts)
            return accounts
        } catch (error) {
            console.error('User denied account access')
        }
    }
    else{ console.log('MetaMask is not installed')
        return false}
}

