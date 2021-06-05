import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{type: String,trim:true, required:true},
    email:{type:String, required:true, trim:true, unique:true, dropDups: true},
    password:{type:String, required:true},
    resetToken:{type:String},
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video'}],
    likedVideos:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Video'}],
    image:{type:String},
    }, {
    timestamps: true}
    
);

const userModel = mongoose.model("User", userSchema);

export default userModel;