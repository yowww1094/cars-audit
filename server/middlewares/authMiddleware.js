import jwt from 'jsonwebtoken';

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
            throw new Error("Not authorized or token expired, Please login again!")
        }
    } else {
        throw new Error("Token does not exisit!");
    }
};

export default authMiddleware;