import { PythonShell } from 'python-shell'
import path from 'path'

const __dirname = path.resolve(path.dirname(''))
const pathToPy = path.join(__dirname, '')

export default function pyInterfaceForMl(inputs) {
    let options = {
        mode: 'json',
        pythonPath: process.env.PATH_TO_PYTHON,
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: pathToPy,
        args: inputs
    }

    return new Promise((resolve, reject) => {
        let shell = new PythonShell('ml.py', options);

        shell.on('message', function (message) {
            resolve(message)
        });

        shell.on('error', reject)

        shell.end(function (err, code, signal) {
            if (err) {
                reject(err)
            }
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished')
        });
    });
}

// // TEST:

// // inputs : 2	1	0	9600000	29900000	12	778	2400000	17600000	22700000	8000000	

// const inputs = [2, 1, 0, 9600000, 29900000, 12, 778, 2400000, 17600000, 22700000, 8000000];
// pyInterfaceForMl(inputs).then(console.log).catch(console.error)