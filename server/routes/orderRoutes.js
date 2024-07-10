import express from 'express';
import { getAllOrder, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete('/:id', deleteOrder);

export default router;