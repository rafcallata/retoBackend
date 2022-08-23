import mongoose, { Schema } from "mongoose";
import { connectDBProcess } from "../../database/mongo";

export const VideoStatusProcess = {
    INIT: 'inicio',
    END: 'fin',
    ERR: 'error'
}

const TiktokVideoSchemas = new Schema({
    tiktokId: {type: Schema.Types.ObjectId}
})

const VideoReelSchema = new Schema({
    lastStatusOfProcess: {type: String, enum: VideoStatusProcess},
    srcLink: {type: String},
    tiktokVideos: {TiktokVideoSchemas}
}, {timestamps: true})

const VideoReelModel = connectDBProcess.model('VideoReels', VideoReelSchema)

export default VideoReelModel