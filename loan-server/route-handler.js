import pyInterfaceForMl from "./pyInterfaceForMl"

export function routeHandler(route, req) {
    let response
    switch (route) {
        case 'model-run':
            // extracting the list of inputs from the list
            const inputs = req.body.inputs
            response = pyInterfaceForMl(inputs)
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