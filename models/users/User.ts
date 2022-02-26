import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";
import Tuit from "../tuits/Tuit";
 
 /**
  * @typedef User Represents user
  * @property {String} username username of user
  * @property {String} password password of user
  * @property {String} firstName firstname of user
  * @property {String} lastName lastname of user
  * @property {String} email email of user
  * @property {String} profilePhoto photo of user
  * @property {String} biography biography of user
  * @property {String} headerImage header of user
  * @property {Date} dateOfBirth dob
  * @property {AccountType} accountType account type
  * @property {MaritalStatus} maritalStatus marital status of user
  * @property {Location} location location of user
  * @property {number} salary salary of user
  * @property {string[]} bookmarks of user
  * @property {string[]} followers of user
  * @property {string[]} followees of user
  */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number,
    bookmarks?: string[],
    followers: string[],
    followees: string[]
};