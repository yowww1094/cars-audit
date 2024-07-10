import express from 'express';
import { getAllOrder, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, getAllOrder);
router.get("/:id", authMiddleware, getOrderById);
router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, updateOrder);
router.delete('/:id', authMiddleware, deleteOrder);

export default router;