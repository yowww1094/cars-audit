import User from "../models/User.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            res.status(404).json({
                message: 'No users found!'
            });
        }
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}

const getUserById = async (req, res) =>{

    const {id} = req.params;
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
    try {
        const user = await User.create({name, username, password});
        if (!user) {
            res.status(400)
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, username, password} = req.body;
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
}

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};