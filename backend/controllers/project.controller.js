import { json } from "express";
import Project from "../models/project.model.js";

const getProjects = async(req,res)=>{
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.log("error in the get projects controller",error);
        res.status(500).json({error:"internal server error"});
    }

}

const getProject = async (req,res)=>{
    try {
        const {id} = req.params;
        const project = await Project.findById(id);
        if(!project)
            return res.status(404).json({error:"could not find the project"});
        res.status(200).json(project);
    } catch (error) {
        console.log("error in the get project controller",error);
        res.status(500).json({error:"internal server error"});
    }
}

const createProject = async(req,res)=>{
    try {
        const {title,field,roadmap,learnings} = req.body;
        if(!title || !field)
            return res.status(400).json({error:"enter all the information"});
        const imagePaths = req.files?.image?.map(file => file.path) || [];
        const newProject = new Project({
            title,
            field,
            roadmap:roadmap?JSON.parse(roadmap):[],
            learnings:learnings?JSON.parse(learnings):[],
            finishedProduct:imagePaths,
        })
        if(!newProject)
            return res.status(500).json({error:"error in creating the project"})
        await newProject.save();
    } catch (error) {
        console.log("error in the create project controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const updateProject = async(req,res)=>{
    try {
        const {id} = req.params;
        const project = await Project.findById(id);
        if(!id)
            return res.status(404).json({error:"Could not find the project"});
        const {title,field,roadmap,learnings} = req.body;
        const updatedData = {
            title,
            field,
            roadmap: roadmap ? JSON.parse(roadmap) : [],
            learnings: learnings ? JSON.parse(learnings) : [],
          };
      
          const updatedProject = await Project.findByIdAndUpdate(projectId, updatedData, {
            new: true,
          });
      
          if (!updatedProject) {
            return res.status(400).json({ message: 'Could not update the project' });
          }
      
          res.status(200).json(updatedProject);
    } catch (error) {
        console.log("error in the update project controller",error);
        res.status(500).josn({error:"Internal Server Error"});
    }
}

export {createProject,updateProject,getProject,getProjects};