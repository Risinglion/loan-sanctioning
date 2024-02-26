import pyInterfaceForMl from "./pyInterfaceForMl.js"
import fs from 'fs'

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
            let walletData = inputs.accounts[0]
            let loanAmount = inputs.accounts[inputs.accounts.length - 1]
            console.log(walletData, loanAmount)
            // TODO: contract deployment and transaction logic
            return inputs
            break
        default:
            return 404
            break
    }
    return response
}