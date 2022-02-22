import mongoose from "mongoose";
import User from "../users/User";

export default interface Message {
    _id: mongoose.Schema.Types.ObjectId;
    message: String;
    from: User;
    to: User;
    sentOn: Date;
}