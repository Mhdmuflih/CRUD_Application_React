import bcrypt from "bcrypt";
import { Request, Response } from "express";

// ----------------------------------------------

import userModel from "../models/userModel";
import cloudinary from "../Cloudinary/cloudinary";
import { userType } from "../Interface/InputType";
import generateToken from "../JWT/JWT";
const profile_img = '/profile_img.jpg';

// -----------------------------------------------


// -----------------------------------------------

// password hasing function
const passwordHashing = async (password: string): Promise<string | undefined> => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(`Hash Password ${passwordHash}`);
        return passwordHash
    } catch (error: any) {
        console.log(error.message);
    }
}

// ------------------------------------------------

// cloudingar function image upload
const imageUpload = async (filePath: any): Promise<string | undefined> => {
    try {


        return new Promise((resolve, reject) => {
            const imageFile = filePath.buffer;

            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: "User_Profile" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result?.secure_url);
                    }
                }
            );

            uploadStream.end(imageFile);
        });


    } catch (error: any) {
        console.log(`error imageupload cloudinary ${error}`);
        return "Failed to upload image"
    }
}

// ------------------------------------------------

const insertUser = async (req: Request, res: Response): Promise<any> => {
    try {

        const { name, email, mobile, password } = req.body as userType;

        if (email) {
            const existingUser = await userModel.findOne({ email: email });
            if (existingUser) {
                return res.status(200).json({ success: false, message: "Already Existing this email." });
            }
        }

        const PASSWORD = password;
        const securePassword = await passwordHashing(PASSWORD);

        const imageURL = profile_img

        const user = new userModel({
            name: name,
            email: email,
            mobile: mobile,
            image: imageURL,
            password: securePassword,
            is_block: false,
        });
        console.log(user)

        await user.save();

        res.status(200).json({ success: true, message: 'Register successful!' });
    } catch (error: any) {
        console.log(error.message)
    }
}


const Login = async (req: Request, res: Response): Promise<any> => {
    try {

        const { email, password } = req.body;
        const userData: any = await userModel.findOne({ email })
        if (!userData) {
            return res.json({ success: false, message: "user is not Found!" })
        }


        const passwordMatch = await bcrypt.compare(password, userData?.password);

        if (!passwordMatch) {
            return res.json({ success: false, message: "Password is not match" });
        }

        const token = generateToken(userData._id);

        res.status(200).json({ success: true, message: "Login Successful", token: token, user: userData });

    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


const editUser = async (req: any, res: Response): Promise<any> => {
    try {
        const { name, email, mobile } = req.body;


        let fileName: any;
        if (req.file) {
            fileName = await imageUpload(req.file);
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const updateUserData = await userModel.findByIdAndUpdate(
            { _id: user._id },
            { name: name, email: email, mobile: mobile, image: fileName },
            { new: true }
        );

        if (!updateUserData) {
            return res.json({ success: false, message: "Failed to update user data" });
        }

        return res.json({ success: true, message: "User data updated successfully", data: updateUserData });

    } catch (error: any) {
        console.log(`Error on developer Edit User: ${error}`);
        return res.status(500).json({ success: false, message: "Internal Server Error" });

    }
}

export {
    insertUser,
    Login,
    editUser,
}