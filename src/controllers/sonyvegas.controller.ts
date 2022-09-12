import { spawn } from 'child_process'
import * as puppeteer from 'puppeteer';
import uuid4 from 'uuid4';
import fs from 'fs';
import path from 'path';

class ImitandoSonyVegas{
    dirVideos: string;
    outDirVideos: string;
    //nuevos
    newDirVideos: string;
    newOutDirVideos: string;
    constructor() {
        // let dirPath = __dirname.replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/")
        // let dirPathEx = `${dirPath.split('/').slice(0,5).join('/')}/srcvideos`
        // let dirOutPathEx = `${dirPath.split('/').slice(0,5).join('/')}/srcVideoOutput`
        // this.dirVideos = dirPathEx.replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/")
        // this.outDirVideos = dirOutPathEx.replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/").replace('\\', "/")


        //nuevo
        let nuevoPath = `${__dirname.split('\\').slice(0,5).join('\\')}\\srcvideos`
        let nuevoDirOutPat = `${__dirname.split('\\').slice(0,5).join('\\')}\\srcVideoOutput`
        this.newDirVideos = nuevoPath
        this.newOutDirVideos = nuevoDirOutPat
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
    async getVideosfromSource(){
        try {
            const browser = await puppeteer.launch({
                headless: false,
                defaultViewport: {
                    width:1920,
                    height: 1080
                },
                args: ['--windows-size=1920, 1080']
            })

            const page = await browser.newPage();
            await page.goto('http://www.youtube.com');

            await page.waitForTimeout(1000);
            await page.type('input#search', 'buscar videos menos de 2 minutos');

            await page.waitForTimeout(1000);
            await page.click('#search-icon-legacy');

            // await page.waitForTimeout(1000);
            // await page.click('#container a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer tp-yt-paper-button#button');

            await page.waitForTimeout(1000);
            const hrefs1 = await page.evaluate(
                () => Array.from(
                  document.querySelectorAll('.ytd-video-renderer#video-title'),
                  a => a.getAttribute('href')                                   
                )
              );
              

            const enlaces = [];
            for (let index = 0; index < hrefs1.length; index++) {
                let href = hrefs1[index];
                href = href.replace('/shorts/', 'https://youtu.be/')
                href = href.replace('/watch?v=', 'https://youtu.be/')
                enlaces.push(href)
            }          
            console.log(enlaces);   
            
            for (let enlace of enlaces) {
                const opts = {shell: true}
                
                const child = spawn(`youtube-dl -f mp4 -o D:/RAFAEL/2022_I/BOOTCAMP/Backend/srcvideos/%(title)s.%(ext)s ${enlace}`, opts)
                console.log(this.dirVideos)
                child.stdout.on('data', (data: any) => {
                    console.log(`stdout: ${data}`);
                });

                child.stderr.on('data', (data: any) => {
                    console.error(`stderr: ${data}`);
                });

                child.on('close', (code: any) => {
                    console.log(`child process exited with code ${code}`);
                });

                child.on('message', (code: any) => {
                    console.log(`this is message from child.on =>`, code)
                });
            }

        } catch (error) {
            throw error
        }
    }
    async RenameVideos() {
        try {
            var files = fs.readdirSync("./srcvideos");
            let i = 1
            files.forEach(async file => {
                let fileJoin = "video";
                let extension = ".mp4"
                fs.renameSync(`./srcvideos/${file}`,`./srcvideos/${fileJoin}${i}${extension}`)
                i= i+1
            })
        } catch (error) {
            throw error
        }
    }
    //obtienes las rutas de los videos con los nombres
    async getFileVideo(){
        try {
            var files = fs.readdirSync("./srcvideos");            
            return files;
        } catch (error) {
            throw error
        }
    }
    //esta funcion sirve para recortar todos los videos en la carpeta srcvideos y los recorta a 10 seg cada 1 
    //y los envia a la carpeta srcVideoOutPut
    async cutVideo(listVideo: string[]){
        try {      
            let i = 1
            let nameDir = "Video_"
            let extension = ".mp4"
            listVideo.forEach(async file => {
                let VideoSource = {
                    srcVideo: `${this.newDirVideos}\\${file}`,
                    srcVideoOutput: `${this.newOutDirVideos}\\${nameDir}${i}${extension}`,                
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
                i = i + 1
                await this.ffmpeg(args)                
            })   

        } catch (error) {
            throw error
        }
    }
    //esta funcion sirve para unir los videos cortados
    async JoinOrConcatVideos(){
        try {                        
            //await this.CreateFileTxt()
            const fileObjt = await this.FileTxt()
            
            console.log(fileObjt)

            let extensionVideo = ".mp4"
            let nameVideo = "VideoFinal"
            //ffmpeg -f concat -i mylist.txt -c copy output.mp4
            let VideoSource = {
                ListVideos: `${this.newOutDirVideos}\\${fileObjt}`,
                srcVideoOutput: `${this.newOutDirVideos}\\${nameVideo}${extensionVideo}`,
            }
            let args = [
                '-safe 0',
                '-f',
                'concat',                
                '-i',
                VideoSource?.ListVideos,
                `-c`,
                `copy`,
                `"${VideoSource?.srcVideoOutput}"`
            ]
            await this.ffmpeg(args)

        } catch (error) {
            throw error
        }
    }
    //esta funcion crea el archivo listVideos.txt donde se guardara la lista de los videos
    async CreateFileTxt(){
        try {
            const opts = {shell: true}            
            const child = spawn(`(for %i in (${this.newOutDirVideos}\\*.mp4) do @echo file '%i') > ${this.newOutDirVideos}\\listVideos.txt`, opts)
            //console.log(this.dirVideos)
            child.stdout.on('data', (data: any) => {
                console.log(`stdout: ${data}`);
            });

            child.stderr.on('data', (data: any) => {
                console.error(`stderr: ${data}`);
            });

            child.on('close', (code: any) => {
                console.log(`child process exited with code ${code}`);
            });

            child.on('message', (code: any) => {
                console.log(`this is message from child.on =>`, code)
            });
        } catch (error) {
            throw error
        }
    }
    //filtra el archivo listVideos.txt donde se tiene todas las rutas de los videos
    async FileTxt(){
        const files = fs.readdirSync("./srcVideoOutPut");
            let archivoName: string
  
            console.log("Filenames with the .txt extension:");
            files.forEach(file => {
            if (path.extname(file) == ".txt")
                archivoName = file
            })
            return archivoName
    }
    //esta funcion sube el video a youtube con el Api de youtube y token de google OAuth
    async publishOnVideoOnYoutube() {
        try {
            let dir = `${__dirname.split('\\').slice(0,5).join('\\')}\\publishYoutuve\\`
            var files = fs.readdirSync("./publishYoutuve");            
            files.forEach(file => {
                console.log(dir)
                const opts = {shell: true}
                const child = spawn(`node ${dir}${file}`, opts)

                child.stdout.on('data', (data: any) => {
                    console.log(`stdout: ${data}`);
                });

                child.stderr.on('data', (data: any) => {
                    console.error(`stderr: ${data}`);
                });

                child.on('close', (code: any) => {
                    console.log(`child process exited with code ${code}`);
                });

                child.on('message', (code: any) => {
                    console.log(`this is message from child.on =>`, code)
                });
              })
        } catch (error) {
            throw error
        }       
    }

}
export default new ImitandoSonyVegas()