import express from 'express';
import { getAllModels, getModelById, createModel, updateModel, deleteModel } from '../controllers/modelController.js';

const router = express.Router();

router.get("/", getAllModels);
router.get("/:id", getModelById);
router.post("/", createModel);
router.put("/:id", updateModel);
router.delete('/:id', deleteModel);

export default router;