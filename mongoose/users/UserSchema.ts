import mongoose, { Schema } from "mongoose";

/**
 * @file creates and exports users schema
 */
const UserSchema = new mongoose.Schema({
  //  _id: String,
   username: {type: String, required: true},
   password: {type: String, required: true},
   firstName: String,
   lastName: String,
   email: String,
   profilePhoto: String,
   headerImage: String,
   accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
   maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
   biography: String,
   dateOfBirth: Date,
   joined: {type: Date, default: Date.now},
   location: {
     latitude: {type: Number, default: 0.0},
     longitude: {type: Number, default: 0.0},
   },
   bookmarks: {
     type: Schema.Types.Array,
     ref: 'TuitModel'
   },
   followers: {
     type: Schema.Types.Array,
     ref: 'UserModel'
   },
   followees: {
     type: Schema.Types.Array,
     ref: 'UserModel'
   }
}, {collection: 'users'});
export default UserSchema;