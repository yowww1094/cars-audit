import { model, models } from 'mongoose';
import Model from '../models/Model.js';

const getAllModels = async (req, res) => {
    try {
        const Models = await Model.find({});
        if(!models){
            res.status(404).json({
                message: "No models found!"
            });
        }
        res.status(200).json({models});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const getModelById = async (req, res) => {
    const {id} = req.params;
    try {
        const oneModel = await Model.findById(id);
        if(!oneModel){
            res.status(404).json({
                message: "Model not found!"
            });
        }
        res.status(200).json({oneModel});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const createModel = async (req, res) => {
    const {name} = req.body;
    try {
        const oneModel = await Model.create({name});
        if(!oneModel){
            res.status(400);
        }
        res.status(200).json({oneModel});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const updateModel = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const Model = await Model.findByIdAndUpdate(id, {name});
        if(!Model){
            res.status(400).json({
                message: "Model not found!"
            });;
        }
        res.status(200).json({Model});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const deleteModel = async (req, res) => {
    const {id} = req.params;
    try {
        const Model = await Model.findByIdAndDelete(id);
        if(!Model){
            res.status(400).json({
                message: "Model not found!"
            });;
        }
        res.status(200).json({Model});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

export {
    getAllModels,
    getModelById,
    createModel,
    updateModel,
    deleteModel,
}