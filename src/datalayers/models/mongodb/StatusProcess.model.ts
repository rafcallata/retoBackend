import mongoose, { Schema } from "mongoose";
import { connectDBProcess } from "../../database/mongo";
import { VideoStatusProcess } from "./VideoReel.models";



const TikTokSchema = new Schema({
    statusOfProcess: {type: String, enum: VideoStatusProcess}
}, {timestamps: true})

const TikTokModel = connectDBProcess.model('TikTok', TikTokSchema)

export default TikTokModel