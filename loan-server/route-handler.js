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
            res.send('Hello from the test2 route')
            break
        default:
            res.send('Hello from the default route')
            break
    }
    return response
}