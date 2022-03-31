import User from "../users/User";
import mongoose from "mongoose";
import Stats from "./Stats";
 
 /**
  * @typedef Tuit Represents tuit by user
  * @property {String} tuit tuit text
  * @property {User} postedBy User poster
  * @property {Date} postedOn date
  */
export default interface Tuit {
   _id: mongoose.Schema.Types.ObjectId;
   tuit: string;
   postedOn?: Date;
   postedBy: User;
   image?: String;
   youtube?: String;
   avatarLogo?: String;
   imageOverlay?: String;
   stats: Stats;
}