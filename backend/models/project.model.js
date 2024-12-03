import mongoose from 'mongoose';


// Task schema for phases
const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

// Phase schema with tasks
const phaseSchema = new mongoose.Schema({
    phase: { type: String, required: true },
    tasks: [taskSchema],
});

const projectSchema = new mongoose.Schema({
    title:{type:String,required:true},
    field:{type:String,required:true},
    roadmap:[phaseSchema],
    profilePic:{type:String,required:true},
    finishedProduct:[{type:String,required:true}], // array of images
    learnings:[{type:String}],
})

const Project = mongoose.model('Project',projectSchema);

export default Project;