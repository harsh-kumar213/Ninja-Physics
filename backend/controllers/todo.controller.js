import Todo from "../models/todo.model.js";

const createTask = async(req,res)=>{
    try {
        const {task} = req.body;
        if(!task)
            return res.status(400).json({error:"Not enough credentials"});
        const newTask = new Todo({
            task,
        })
        if(!task)
            return res.status(500).json({error:"Couldn't create the task"});
        await newTask.save();
        res.status(200).json(newTask);
    } catch (error) {
        console.log("error in the create task controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const updateTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const {task,completed} = req.body;
        const todo = await Todo.findByIdAndUpdate(id,{task,completed});
        if(!todo)
            return res.status(500).json({error:"Error in updating the task"});
        res.status(200).json(todo);
    } catch (error) {
        console.log("error in the update task controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await Todo.findByIdAndDelete(id);
        if(!task)
            return res.status(404).json({error:"Task not found"});
        res.status(200).json({msg:"Task Deleted"});
        
    } catch (error) {
        console.log("error in the delete task controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Todo.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {createTask,getTasks,updateTask,deleteTask};