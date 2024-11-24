import jwt from "jsonwebtoken";


const generateToken = (Payload: any): string => {

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    return jwt.sign(
        { Payload }, // Correct payload format
        process.env.JWT_SECRET, // Secret key
        { expiresIn: '1h' } // Correct property name (expiresIn)
      );
}

export default generateToken;