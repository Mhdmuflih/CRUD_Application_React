import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

// -------------------------------------------------------

import connectDB from "./database/database";
import user_route from "./routes/userRoute";
import Admin_Route from "./routes/AdminRoute";

// -------------------------------------------------------


// dotevn setup
dotenv.config();

// mongodb connection
connectDB();

// server creation
const app: Application = express();

// cors configuration
const coreOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credential: true,
    optionsSuccessStatus: 204
}

app.use(cors(coreOptions));                 // cors setting
app.use(express.json());                    //conver to json formate.

app.use(express.urlencoded({ extended: true }));



app.use('/', user_route);
app.use('/admin', Admin_Route);


// port setup
const port: string | number = process.env.PORT || 8888;
// -------------------------------------------------------------

// server starting...
app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`);
});

// -------------------------------------------------------------
