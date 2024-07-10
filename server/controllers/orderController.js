import Order from '../models/Order.js';

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders) {
            res.status(404).json({
                message: "No Orders found"
            });
        }
        res.status(200).json({orders});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const getOrderById = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({order});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const createOrder = async (req, res) => {
    const {dateEntrer, dateSortie, blNumber, brand, model, matricule, clientName, clientPhone, serviceType, technicien, price, paidAmt, seniorityCard, fidelity} = req.body;
    try {
        const order = await Order.create({dateEntrer, dateSortie, blNumber, brand, model, matricule, clientName, clientPhone, serviceType, technicien, price, paidAmt, seniorityCard, fidelity});
        if (!order) {
            res.status(400);
        }
        res.status(200).json({order});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const updateOrder = async (req, res) => {
    const {id} = req.params;
    const {dateEntrer, dateSortie, blNumber, brand, model, matricule, clientName, clientPhone, serviceType, technicien, price, paidAmt, seniorityCard, fidelity} = req.body;
    try {
        const order = await Order.findByIdAndUpdate(id, {dateEntrer, dateSortie, blNumber, brand, model, matricule, clientName, clientPhone, serviceType, technicien, price, paidAmt, seniorityCard, fidelity});
        if (!order) {
            res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            message: "Order updated Successfully!",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

const deleteOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            message: "Order deleted Successfully!",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
        console.log("Server error", error); 
    }
};

export {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
}