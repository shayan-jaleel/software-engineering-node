import mongoose from "mongoose";
import User from "../users/User";
 
 /**
  * @typedef Message Represents message between users
  * @property {String} message message text
  * @property {User} from User sender
  * @property {User} to User receiver
  * @property {Date} sentOn date
  */
 
export default interface Message {
    _id: mongoose.Schema.Types.ObjectId;
    message: String;
    from: User;
    to: User;
    sentOn: Date;
}