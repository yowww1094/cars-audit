import Service from '../models/Service.js';

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        if(!services){
            res.status(404).json({
                message: "No services found!"
            });
        }
        res.status(200).json({services});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const getServiceById = async (req, res) => {
    const {id} = req.params;
    try {
        const oneService = await Service.findById(id);
        if(!oneService){
            res.status(404).json({
                message: "Service not found!"
            });
        }
        res.status(200).json({oneService});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const createService = async (req, res) => {
    const {serviceId, name} = req.body;
    try {
        const oneService = await Service.create({serviceId, name});
        if(!oneService){
            res.status(400);
        }
        res.status(200).json({oneService});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const updateService = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const service = await Service.findByIdAndUpdate(id, {name});
        if(!service){
            res.status(400).json({
                message: "Service not found!"
            });;
        }
        res.status(200).json({service});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const deleteService = async (req, res) => {
    const {id} = req.params;
    try {
        const service = await Service.findByIdAndDelete(id);
        if(!service){
            res.status(400).json({
                message: "Service not found!"
            });;
        }
        res.status(200).json({service});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

export {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
}