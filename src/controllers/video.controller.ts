import VideoReelModel, { VideoStatusProcess } from "../datalayers/models/mongodb/VideoReel.models"
import sonyvegasController from "./sonyvegas.controller"
import SonyvegasController from "./sonyvegas.controller"


class VideoController{    
   async getVideosfromSource() {
        try {            
            await SonyvegasController.getVideosfromSource()
        } catch (error) {
            throw error
        }
   }
    async RenameVideos(){
        try {            
            await SonyvegasController.RenameVideos()
        } catch (error) {
            throw error
        }
    }
    async cutVideo(){
        try {            
            const listOfVideos = await SonyvegasController.getFileVideo()
            await sonyvegasController.cutVideo(listOfVideos)
        } catch (error) {
            throw error
        }
    }    
    async createFileTxt() {
        try {            
            await SonyvegasController.CreateFileTxt()
        } catch (error) {
            throw error
        }
    }
    async joinVideo() {
        try {
            
            await SonyvegasController.JoinOrConcatVideos()
        } catch (error) {
            throw error
        }
    }

}
export default new VideoController()