import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      likes:{type:Number},
      dislikes:{type:Number}
    },
    {
      timestamps: true,
    }
  );

const videoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    videoURL:{type:String, required:true},
    likes:{type:Number, default:0},
    dislikes:{type:Number, default:0},
    comments:[commentSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;