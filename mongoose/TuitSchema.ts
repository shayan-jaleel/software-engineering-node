import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
   postedOn: {type: Date, default: Date.now},
   postedBy: {
    type: String,
    ref: 'UserModel'
}
}, {collection: 'tuits'});
export default TuitSchema;