/**
 * @file creates and exports message schema
 */
import mongoose, { Schema } from "mongoose";



const TuitSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
   postedOn: {type: Date, default: Date.now},
   postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0}
    }
}, {collection: 'tuits'});
export default TuitSchema;
