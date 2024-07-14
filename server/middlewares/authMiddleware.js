import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    let token;
    
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req?.headers?.authorization?.split(" ")[1];

        try {
            if(token){
                const jwtSecretKet = process.env.SECRET_KEY;
                const decoded = jwt.verify(token, jwtSecretKet);
                const user = User.findOne(decoded?.id)
                req.user = user;
                next();
            }
        } catch (error) {
            return res.status(400).json({
                auth: false,
                message: "Not authorized or token expired, Please login again!"
            })
        }
    } else {
        return res.status(400).json({
            auth: false,
            message: "Token does not exisit!"
        })
    }
};

export default authMiddleware;