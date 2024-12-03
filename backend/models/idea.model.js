import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: {type:String},
    attachments:{
      type:[String],
      default:[],
    }
  },
  { timestamps: true }
);

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;