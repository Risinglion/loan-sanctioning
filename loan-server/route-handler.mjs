import pyInterfaceForMl from "./pyInterfaceForMl.mjs"
import { sendLoanAmount, getUserDetails } from "./web3-interface.mjs"
import prompt from 'prompt'

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
            inputs = inputs.body.data
            console.log(inputs)
            let clientAddress = inputs.accounts[0]
            let loanAmount = inputs.form['loan']
            let modelAcceptance = inputs.modelAcceptance
            let adminAcceptance = false;
            if(modelAcceptance == 1)
                console.log('Model Accepted the request')
            else
                console.log('Model Rejected the request')

            console.log('Loan Amount:', loanAmount)
            console.log('Client Address:', clientAddress)
            console.log('Model Acceptance:', modelAcceptance)
            
            // TODO: Add the logic to verify the user entered data
            // // NOTE: This can be done in the model-run route instead to save computation

            prompt.start()

            let schema = {
                properties: {
                    adminAcceptance: {
                        description: 'Would you like to confirm the application? (yes/no)',
                        required: true
                    }
                }
            }

            let result = await prompt.get(schema)
            adminAcceptance = result.adminAcceptance
            if(adminAcceptance == 'yes' || adminAcceptance == 'Yes' || adminAcceptance == 'YES' || adminAcceptance == 'y' || adminAcceptance == 'Y')
                adminAcceptance = true
            else if(adminAcceptance == 'no' || adminAcceptance == 'No' || adminAcceptance == 'NO' || adminAcceptance == 'n' || adminAcceptance == 'N')
                adminAcceptance = false

            if(adminAcceptance){
                // TODO: contract deployment and transaction logic
                console.log('Admin Accepted the request')
                response = await sendLoanAmount(loanAmount, clientAddress)
            }
            else
                response = 'Admin Rejected the request'
            console.log(response)
            return response
            break
        case 'metamask-login':
            response = await getUserDetails(inputs.accounts[0])
            if(response){
                for (let key in response)
                    if(key!='userAddress') response[key] = response[key].slice(0, -1)
                return response
            } else {
                return false
            }
            break
        default:
            return 404
            break
    }
    return response
}