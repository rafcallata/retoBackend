import { spawn } from 'child_process'

const ffmpegExecute = (srcVideo, srcVideoOutput) => new Promise((resolve, reject) => {

    const opts = {shell: true}
    let args = [
        '-y',
        '-i',
        srcVideo,
        '-trheads 4',
        'ss 00:00:00',
        '-to 00:00:20',
        '-async 1',
        srcVideoOutput
    ]
    const child = spawn('ffmpeg', {args}, opts)
    child.stdout.on('data', (data: any) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data: any) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code: any) => {
        console.log(`child process exited with code ${code}`);
        resolve(`proceso terminado => ${code}`)
    });

    child.on('error', (code: any) => {
        reject(`proceso con errores => ${code}`)
    });

    child.on('message', (code: any) => {
        console.log(`this is message from child.on =>`, code)
    });


})