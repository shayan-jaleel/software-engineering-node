/**
 * @file creates and exports message schema
 */
import mongoose, { Schema } from "mongoose";
import UserModel from "../users/UserModel";


const MessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {collection: 'messages'});

export default MessageSchema;