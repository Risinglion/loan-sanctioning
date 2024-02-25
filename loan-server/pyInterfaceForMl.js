import PythonShell from 'python-shell'

export default function pyInterfaceForMl(inputs){
    let options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '',
        args: inputs
    }
    let response = "No response"
    PythonShell.run('ml.py', options, function (err, results) { // TODO ML.py 
        if (err) throw err
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results)
        response = results
    })
    return response
}