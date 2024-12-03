import Idea from "../models/idea.model.js";

const createIdea = async(req,res)=>{
    try {
        if(!req.files['image'])
        {
           return res.status(400).json({error:"image file required"});
        }
        const {title,content} = req.body;
        console.log(req.files);
        const imagePath = req.files['image'][0].path;
        const pdfPaths = req.files['pdf'] ? req.files['pdf'].map(file => file.path) : [];

        const newIdea = new Idea({
            title,
            content,
            image:imagePath,
            attachments:pdfPaths,
        })
        if(newIdea)
        {
            await newIdea.save();
        }
        else
          res.status(500).json({error:"error in creating new Idea"});
        
        res.status(200).json(newIdea);

    } catch (error) {
        console.log("error in creating new Idea controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getAllIdeas = async(req,res)=>{
    try {
        const ideas = await Idea.find();
        res.status(200).json(ideas);
    } catch (error) {
        console.log("could not find the ideas",error);
        res.staus(404).json({error:"could not find the ideas"})
    }
}

const getIdea = async(req,res)=>{
    try {
        const {id} = req.params;
        const idea = await Idea.findById(id);
        if(!idea)
        {
            return res.status(404).json({error:"error in findind the idea"});
        }
        res.status(200).json(idea);
    } catch (error) {
        console.log("error in getting a single idea",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const deleteIdea = async(req,res)=>{
    try {
        const {id} = req.params;
        const idea = await Idea.findById(id);
        if(!idea)
            return res.status(404).json({error:"Idea not found to delete"});
        await Idea.findByIdAndDelete(id);
    } catch (error) {
        console.log("error in the idea delete controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const updateIdea = async(req,res)=>{
    try {
        
        const ideaId = req.params.id; 
        console.log(ideaId);
        const updateData = { ...req.body }; 
        console.log(updateData)
       
        const existingIdea = await Idea.findById(ideaId);
        if (!existingIdea) {
          return res.status(404).json({ message: "Idea not found" });
        }
    
        
        if (!req.body.image) {
          updateData.image = existingIdea.image; 
        }
        if (req.files?.pdf) {
            console.log('Received PDF files:', req.files.pdf);
            const newPdfs = req.files.pdf.map(file => file.path);
            existingIdea.attachments.push(...newPdfs);
          }
    
      
          const updatedIdea = await existingIdea.save();  // Save the changes directly

          console.log('Updated Idea:', updatedIdea);
       
        res.json(updatedIdea);
    } catch (error) {
        console.log("error in the update idea controller ",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export {createIdea,getAllIdeas,getIdea,updateIdea,deleteIdea};

