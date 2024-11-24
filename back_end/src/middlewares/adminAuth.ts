// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// interface CustomRequest extends Request {
//     admin?: JwtPayload | string;
// }

// const adminAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
//     const token = req.headers['authorization']?.split(' ')[1];

//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET as string, (err, admin) => {
//             console.log("adminAuth heloooooooo");

//             if (err) return res.sendStatus(403);

//             req.admin = admin;

//             next();
//         });
//     } else {
//         console.log("adminAuth heloooooooo");
//         res.sendStatus(401);
//     }
// };

// export default adminAuth;
