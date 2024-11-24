// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import userModel from '../models/userModel';

// interface CustomRequest extends Request {
//     user?: any
// }

// const userAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
//     const token = req.headers['authorization']?.split(' ')[1];

//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
//             if (err) return res.sendStatus(403);

//             console.log("user auth!!!!!!!!!!!!!!!");

//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };


// const isValidUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
//     try {
//         const payload = typeof req.user === 'object' ? req.user.payload : null;

//         if (!payload) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Invalid token payload',
//             });
//         }

//         const user = await userModel.findOne({ _id: payload });

//         if (user) {
//             next();
//         } else {
//             console.log("you are deleted by admin");
//             res.status(403).json({
//                 success: false,
//                 message: 'User not found',
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//         });
//     }
// };

// export {
//     userAuth,
//     isValidUser
// };
