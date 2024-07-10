import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign({id}, secretKey, {expiresIn: 60*60*30})
};

export default generateToken;