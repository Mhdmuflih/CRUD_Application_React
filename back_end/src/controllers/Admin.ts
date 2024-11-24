import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import generateToken from "../JWT/JWT";
const profile_img = '/profile_img.jpg';

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

// -----------------------------------------------


const AdminLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const adminData: any = await userModel.findOne({ email: email, is_verified: "1" });

        if (!adminData) {
            return res.json({ success: false, message: "Admin Data is not correct" })
        }

        const passwordMatch = await bcrypt.compare(password, adminData?.password);
        if (!passwordMatch) {
            return res.json({ success: false, message: "user email id and password incorrect" })
        }
        const token = generateToken(email);

        res.status(200).json({ success: true, message: 'Request successful!', token: token });

    } catch (error: any) {
        console.log(error.message);
    }
}


const getUserDetails = async (req: Request, res: Response): Promise<any> => {
    try {

        const userData = await userModel.find({ is_verified: "0" });

        res.status(200).json({ success: true, message: "send user Data", userData: userData });


    } catch (error: any) {
        console.log(error.message);
    }
}

const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const user = await userModel.findByIdAndDelete({ _id: id });
        console.log(user, 'this is delete user');


        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: "Delete User" });

    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


const editUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, email, mobile } = req.body;

        const userData = await userModel.findById({ _id: id });

        if (!userData) {
            return res.json({ success: false, message: "user is not Found!" })
        }

        const updatedUserData = await userModel.findByIdAndUpdate({ _id: id }, { $set: { name: name, email: email, mobile: mobile } });

        res.status(200).json({ success: true, message: "Edit User Success" , user:updatedUserData });

    } catch (error: any) {
        console.log(error.message);
    }
}

const addUser = async (req: Request, res: Response): Promise<any> => {
    try {

        const { name, email, mobile, password } = req.body;

        if (email) {
            const existingUser = await userModel.findOne({ email: email });
            if (existingUser) {
                return res.status(200).json({ success: false, message: "Already Existing this email." });
            }
        }

        const securePassword = await passwordHashing(password);

        const user = new userModel({
            name: name,
            mobile: mobile,
            email: email,
            password: securePassword,
            image: profile_img,
            is_block: false
        })
        console.log(user, 'user');

        await user.save();

        res.status(200).json({ success: true, message: 'Register successful!' });


    } catch (error: any) {
        console.log(error.message);
    }
}


const actionUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { _id } = req.body;

        const userData = await userModel.findById(_id);

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newBlockStatus = !userData.is_block;

        const updatedBlockUser = await userModel.findByIdAndUpdate(
            _id,
            { is_block: newBlockStatus },
            { new: true }
        );

        if (updatedBlockUser) {
            return res.json({ success: true, message: `User has been ${newBlockStatus ? 'blocked' : 'unblocked'} successfully`, user: updatedBlockUser });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to update user' });
        }

    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export {
    AdminLogin,
    getUserDetails,
    deleteUser,
    editUser,
    addUser,
    actionUser
}