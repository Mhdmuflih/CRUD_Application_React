import express from "express";
import { editUser, insertUser, Login } from "../controllers/User";
import upload from "../Cloudinary/multer";

const user_route = express();

user_route.post('/register', insertUser);
user_route.post('/', Login);

user_route.put('/home/edit-user', upload.single('image') , editUser)

export default user_route;