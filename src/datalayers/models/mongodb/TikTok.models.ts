import mongoose, { Schema } from "mongoose";
import { connectDBProcess } from "../../database/mongo";

const TikTokSchema = new Schema({
    VideoLink: {type: String},
    srcLink: {type: String}
}, {timestamps: true})

const TikTokModel = connectDBProcess.model('TikTok', TikTokSchema)

export default TikTokModel