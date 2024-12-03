import fs from 'fs';
import path from 'path';
import Network from "../models/network.model.js";

const getNetworks = async(req,res)=>{
    try {
        const networks = await Network.findOne();
        if(!networks)
            return res.status(404).json({error:"no network at the moment"});
        res.status(200).json(networks);
    } catch (error) {
        console.log("error in the get network controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getNetwork = async(req,res)=>{
    try {
        const {id} = req.params;
        const network = await Network.findById(id);
        if(!network)
            return res.status(404).json({error:"Could not find the network"});
        res.status(200).json(network);
    } catch (error) {
        console.log("error in the get network controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const deleteNetwork  = async(req,res)=>{
    try {
        const {id} = req.params;
        await Network.findByIdAndDelete(id);
    } catch (error) {
        console.log("error in network delete controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const createNetwork = async(req,res)=>{
    try {
        const whatTheyWant = req.body.whatTheyWant ? JSON.parse(req.body.whatTheyWant) : [];
        const whatThetNeed = req.body.whatThetNeed ? JSON.parse(req.body.whatThetNeed) : [];
        const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
        const lessons = req.body.lessons ? JSON.parse(req.body.lessons) : [];
    
      
        const {
          fullName,
          gender,
          location,
          affiliation,
          bio,
          status,
          socialMedia = {}
        } = req.body;
    
        
        const socialMediaLinks = socialMedia
          ? JSON.parse(socialMedia)
          : { linkedIn: '', x: '', instagram: '' };
    
       
        const profilePic = req.files?.image ? req.files.image[0].path : null;
        const showroom = req.files?.showroom ? req.files.showroom.map(file => file.path) : [];
       
        const newNetwork = new Network({
          fullName,
          gender,
          location,
          affiliation,
          bio,
          status,
          whatTheyWant,
          whatThetNeed,
          skills,
          socialMedia: socialMediaLinks,
          showroom,
          profilePic,
          lessons
        });
    
        
        await newNetwork.save();
        res.status(201).json({ message: 'Network entry created successfully', network: newNetwork });
    } catch (error) {
        console.log("error in the network create controller",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}



const updateNetwork = async (req, res) => {
  try {
    const networkId = req.params.id;
    console.log(req.body)
    // Parse fields that may come as JSON strings if using form-data
    const whatTheyWant = req.body.whatTheyWant ?(req.body.whatTheyWant) : [];
    const whatTheyNeed = req.body.whatTheyNeed ?(req.body.whatTheyNeed) : [];
    const skills = req.body.skills ? (req.body.skills) : [];
    const lessons = req.body.lessons ? (req.body.lessons) : [];

    const {
      fullName,
      gender,
      location,
      affiliation,
      bio,
      status,
      socialMedia = {}
    } = req.body;

    const socialMediaLinks = socialMedia ? JSON.parse(socialMedia) : { linkedIn: '', x: '', instagram: '' };

    // Find the existing network entry by ID
    const existingNetwork = await Network.findById(networkId);
    if (!existingNetwork) {
      return res.status(404).json({ message: 'Network entry not found' });
    }

    // Handle main image update
    if (req.files?.image?.[0]) {
      const newImagePath = req.files.image[0].path;

      // Delete the old image if it exists
      if (existingNetwork.image) {
        const oldImagePath = path.resolve(existingNetwork.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      existingNetwork.profilePic
       = newImagePath;
    }

    // Handle showroom updates
    if (req.files?.showroom) {
      const newShowroomImages = req.files.showroom.map(file => file.path);
      existingNetwork.showroom.push(...newShowroomImages); // Push new images to showroom array
    }


    // Update other fields
    existingNetwork.fullName = fullName || existingNetwork.fullName;
    existingNetwork.gender = gender || existingNetwork.gender;
    existingNetwork.location = location || existingNetwork.location;
    existingNetwork.affiliation = affiliation || existingNetwork.affiliation;
    existingNetwork.bio = bio || existingNetwork.bio;
    existingNetwork.status = status || existingNetwork.status;
    existingNetwork.whatTheyWant = whatTheyWant.length > 0 ? whatTheyWant : existingNetwork.whatTheyWant;
    existingNetwork.whatTheyNeed = whatTheyNeed.length > 0 ? whatTheyNeed : existingNetwork.whatTheyNeed;
    existingNetwork.skills = skills.length > 0 ? skills : existingNetwork.skills;
    existingNetwork.lessons = lessons.length > 0 ? lessons : existingNetwork.lessons;
    existingNetwork.socialMedia = socialMediaLinks;
    
    

    // Save the updated network
    const updatedNetwork = await existingNetwork.save();

    res.status(200).json({
      message: 'Network entry updated successfully',
      network: updatedNetwork
    });
  } catch (error) {
    console.error('Error updating network entry:', error);
    res.status(500).json({ message: 'Error updating network entry', error: error.message });
  }
};

export default updateNetwork;


export {createNetwork,updateNetwork,deleteNetwork,getNetworks,getNetwork};
