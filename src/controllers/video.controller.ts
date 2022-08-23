import VideoReelModel, { VideoStatusProcess } from "../datalayers/models/mongodb/VideoReel.models"
import SonyvegasController from "./sonyvegas.controller"
import youtuveController from "./youtuve.controller"

class VideoController{
    async testingFfmpeg(){
        try {
            await SonyvegasController.ffmpeg({})
        } catch (error) {
            throw error
        }
    }
    async executeProccessToBuildReel(){
        const videoId: any = null
        try {            
            //al iniciar proceso
            await this.setStatusOfVideos({
                videoId: videoId,
                status: VideoStatusProcess.INIT
            })
            //al finalizar proceso
            await this.setStatusOfVideos({
                videoId: videoId,
                status: VideoStatusProcess.END
            })
        } catch (error) {
            //al obtener error en el proceso
            await this.setStatusOfVideos({
                videoId: videoId,
                status: VideoStatusProcess.ERR
            })
            throw error
        }
    }
    async getStatusOfProcess(){
        try {
            
        } catch (error) {
            throw error
        }
    }
    private async setStatusOfVideos({}: any){

    }
    private async createVideoReel(){

    }
    async testMongoDB(){
        try {
            const data = await VideoReelModel.findOne({}).lean()
            console.log("~ file: Video.controller.ts ~ line 42 ~ VideoController ~ testMongoDB ~ data", data)
            return data
        } catch (error) {
            throw error
        }
    }
    async cutVideo(nameVideo: string) {
        try {
            await youtuveController.getVideos();
            await SonyvegasController.cutVideo(nameVideo)
        } catch (error) {
            throw error
        }
    }
    async cutVideoPost(nameVideo: string, startTime: string, endTime: string, numberCpusAvailables: number) {
        try {
            await SonyvegasController.cutVideoPost(nameVideo, startTime, endTime, numberCpusAvailables)
        } catch (error) {
            throw error
        }
    }
    async GetVideosYoutube(){
        
    }
}
export default new VideoController()