import Brand from '../models/Brand.js';

const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        if(!brands){
            res.status(404).json({
                message: "No brands found!"
            });
        }
        res.status(200).json({brands});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const getBrandById = async (req, res) => {
    const {id} = req.params;
    try {
        const brand = await Brand.findById(id);
        if(!brand){
            res.status(404).json({
                message: "Brand not found!"
            });
        }
        res.status(200).json({brand});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}
const createBrand = async (req, res) => {
    const {name} = req.body;
    try {
        const brand = await Brand.create({name});
        if(!brand){
            res.status(400);
        }
        res.status(200).json({brand});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}
const updateBrand = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const brand = await Brand.findByIdAndUpdate(id, {name});
        if(!brand){
            res.status(400).json({
                message: "Brand not found!"
            });;
        }
        res.status(200).json({brand});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}
const deleteBrand = async (req, res) => {
    const {id} = req.params;
    try {
        const brand = await Brand.findByIdAndDelete(id);
        if(!brand){
            res.status(400).json({
                message: "Brand not found!"
            });;
        }
        res.status(200).json({brand});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
}

export {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
}