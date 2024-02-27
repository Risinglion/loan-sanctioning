import pyInterfaceForMl from "./pyInterfaceForMl.mjs"
import fs from 'fs'
import { sendLoanAmount } from "./web3-interface.mjs"

export async function routeHandler(route, inputs) {
    let response
    switch (route) {
        case 'model-run':
            // TODO: Add the logic to handle the inputs that are jumbled up
            inputs = inputs.body
            for (let i = 0; i < 4; i++){
                delete inputs[Object.keys(inputs)[0]]
            }
            let inputValues = Object.values(inputs)
            response = await pyInterfaceForMl(inputValues)
            console.log(response)
            return response
            break
        case 'web3':
            inputs = inputs.body
            let clientAddress = inputs.accounts[0]
            let loanAmount = inputs.accounts[inputs.accounts.length - 1]
            console.log(walletData, loanAmount)
            // TODO: contract deployment and transaction logic
            response = await sendLoanAmount(loanAmount, clientAddress)
            return inputs
            break
        default:
            return 404
            break
    }
    return response
}