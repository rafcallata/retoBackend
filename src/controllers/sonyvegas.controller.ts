import { spawn } from 'child_process'
import uuid4 from 'uuid4';

class ImitandoSonyVegas{
    dirVideos: string;
    outDirVideos: string;
    constructor() {
        let dirPath = __dirname.replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/")
        let dirPathEx = `${dirPath.split('/').slice(0,5).join('/')}/srcvideos`
        let dirOutPathEx = `${dirPath.split('/').slice(0,5).join('/')}/srcVideoOutput`
        this.dirVideos = dirPathEx.replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/")
        this.outDirVideos = dirOutPathEx.replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/")
        
    }
    async ffmpeg(argsFfmpeg: any) {
        try {            
            //console.log("🚀 ~ file: sonyvegas.controller.ts ~ line 13 ~ ImitandoSonyVegas ~ ffmpeg ~ dirPath", this.dirVideos);
            return new Promise((resolve, reject) => {
                const opts = {shell: true}
                console.log("🚀 ~ file: sonyvegas.controller.ts ~ line 13 ~ ImitandoSonyVegas ~ ffmpeg ~ argsFfmpeg", argsFfmpeg);
                const child = spawn('ffmpeg', (argsFfmpeg), opts)

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

            });
        } catch (error) {
            console.log("🚀 ~ file: sonyvegas.controller.ts ~ line 39 ~ ImitandoSonyVegas ~ ffmpeg ~ error", error)
        }
    }
    async cutVideo(nameVideo: string){
        try {
            let extensionVideo = '.mp4'
            let VideoSource = {
                srcVideo: `${this.dirVideos}/${nameVideo}`,
                srcVideoOutput: `${this.outDirVideos}/${uuid4()}-${nameVideo}`,
                //srcVideoOutput: `${this.outDirVideos}/${nameVideo}-${uuid4()}${extensionVideo}`,
            }
            let args = [
                '-y',
                '-i',
                VideoSource?.srcVideo,
                '-threads 4',
                '-ss 00:00:00',
                '-to 00:00:10',
                '-async 1',
                VideoSource?.srcVideoOutput
            ]
            await this.ffmpeg(args)
        } catch (error) {
            throw error
        }
    }
    async cutVideoPost(nameVideo: string, startTime: string, endTime: string, numberCpusAvailables = 4){
        try {
            let extensionVideo = '.mp4'
            let VideoSource = {
                srcVideo: `${this.dirVideos}/${nameVideo}${extensionVideo}`,
                srcVideoOutput: `${this.dirVideos}/${nameVideo}-${uuid4()}${extensionVideo}`,
            }
            let args = [
                '-y',
                '-i',
                VideoSource?.srcVideo,
                `-threads ${numberCpusAvailables}`,
                `-ss ${startTime}`,
                `-to ${endTime}`,
                '-async 1',
                VideoSource?.srcVideoOutput
            ]
            await this.ffmpeg(args)
        } catch (error) {
            throw error
        }
    }
    async cutVideos(arrVideos: any[]){
        try {
            
        } catch (error) {
            
        }
    }
    async joinVideos(arrVideos: any[]){
        try {
            
        } catch (error) {
            
        }
    }
    async addFilterVideos(arrVideos: any[]){
        try {
            
        } catch (error) {
            
        }
    }
    async addImageVideos(arrVideos: any[]){
        try {
            
        } catch (error) {
            
        }
    }
}

export default new ImitandoSonyVegas()