import express from "express";
import { actionUser, addUser, AdminLogin, deleteUser , editUser, getUserDetails } from "../controllers/Admin";


const Admin_Route = express();

Admin_Route.post('/login', AdminLogin);
Admin_Route.get('/user-details', getUserDetails);

Admin_Route.delete('/delete-user/:id', deleteUser);
Admin_Route.put('/edit-user/:id', editUser);
Admin_Route.post('/action', actionUser)

Admin_Route.post('/add-user', addUser);

export default Admin_Route;