import express from 'express';
import { getAllServices, getServiceById, createService, updateService, deleteService } from '../controllers/serviceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, getAllServices);
router.get("/:id", authMiddleware, getServiceById);
router.post("/", authMiddleware, createService);
router.put("/:id", authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

export default router;