import mongoose from "mongoose";

const networkSchema = new mongoose.Schema({
    fullName:{type:String,required:true},
    gender:{type:String,required:true},
    location:{type:String,required:true},
    affiliation:{type:String,required:true},
    bio:{type:String,required:true},
    status:{type:String,required:true},
    whatTheyWant:[{type:String}],
    whatTheytNeed:[{type:String}],
    skills:[{type:String,required:true}],
    socialMedia:{
        linkedIn:{type:String},
        x:{type:String},
        instagram:{type:String},
    },
    showroom:[{type:String}], //array of images
    profilePic:{type:String},// image
    lessons:[{type:String}],
});

const Network = mongoose.model('Network',networkSchema);

export default Network;