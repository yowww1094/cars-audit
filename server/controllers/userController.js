import generateToken from "../config/jsonWebToken.js";
import User from "../models/User.js";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json({
                message: 'No users found!'
            });
            //throw new Error("No users found!");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!!"
        })
        console.log("Server error", error); 
    }
}

const getUserById = async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}

const createUser = async (req, res) => {
    const {name, username, password} = req.body;

    const userExist = await User.findOne({username});
    if (!userExist) {
        try {
            const user = await User.create({name, username, password});
            if (!user) {
                res.status(400)
                //throw new Error({statusCode: 400});
            }
            return res.status(200).json({
                id: user?._id, 
                name: user?.name, 
                username: user?.username
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong!"
            })
            console.log("Server error", error);
        }
    }
    res.status(400).json({
        message: "User already exists!"
    })
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, username, password} = req.body;

    validateMongoDbId(id);
    try {
        const user = await User.findByIdAndUpdate(id, {name, username, password});
        if (!user) {
            res.status(404).json({
                message: "User not found!"
            })
        }
        res.status(200).json({
            message: "User updated Successfully!",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({
                message: "User not found!"
            })
        }
        res.status(200).json({
            message: "User deleted Successfully!",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const loginUser = async (req, res) => {
    const {name, username, password} = req.body;

    const findUser = await User.findOne({username});
    if (findUser) {
        const matchedPassword = findUser.isPasswordMatched(password);

        if(!matchedPassword) throw new Error("Invalide credentials");

        const jwtToken = generateToken(findUser._id);
        //console.log(jwtToken);

        res.status(200).json({
            id: findUser._id,
            name: findUser.name,
            token: jwtToken,
        })
    }
};

const logoutUser = (req, res) => {

};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
};