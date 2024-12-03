import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

import generateTokenAndSetCookie from '../utils/getToken.js';

const signup = async(req,res)=>{
    try {
        const {password} = req.body;
        if(!password)
            return res.status(500).json({error:"Credentials not provided"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            userName:"Adam",
            password:hashedPassword,
        })
        if(newUser)
        {
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(200).json({
                _id:newUser._id,
            })
        }
        else{
            res.status(400).json({error:"Invalid user data"});
        }
        
    } catch (error) {
        console.log("error in the signup controller");
        res.status(500).json({error:"internal sever error"});
    }
}

const login = async (req,res)=>{
    try {
        const {password} = req.body;
        console.log(password);
        const userName = 'Adam';
        const user = await User.findOne({userName});
        const isPasswordCorrect = user && await bcrypt.compare(password,user?.password||"")
        if(!user || !isPasswordCorrect)
        {
            return res.status(400).json({error:"Invalid  password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.json(
            {
                _id:user._id,
                userName:user.userName,
            }
        );
        console.log("logged in")

    } catch (error) {
        console.log("error in the login controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}
const logout =(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({msg:"logged out successfully"});
    } catch (error) {
        console.log("error in the logout controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const passwordChange = async (req,res)=>{
    try {
        const {id,oldPassword,newPassword} = req.body;
        console.log(id,oldPassword,newPassword)
        const user = await User.findById(id);
        if(!user)
            return res.status(404).json({error:"unable to find the user"});
        const isPasswordCorrect = bcrypt.compare(oldPassword,user?.password)
        if(!isPasswordCorrect)
            return res.status(400).json({error:"wrong password entered"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.log("error in changing the password",error);
        res.status(500).json({error:"internal server error"});
    }
}

export {signup,login,logout,passwordChange};