import express from 'express';
import { getAllModels, getModelById, createModel, updateModel, deleteModel } from '../controllers/modelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, getAllModels);
router.get("/:id", authMiddleware, getModelById);
router.post("/", authMiddleware, createModel);
router.put("/:id", authMiddleware, updateModel);
router.delete('/:id', authMiddleware, deleteModel);

export default router;