import express from 'express';
import { getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand, } from '../controllers/brandController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, getAllBrands);
router.get("/:id", authMiddleware, getBrandById);
router.post("/", authMiddleware, createBrand);
router.put("/:id", authMiddleware, updateBrand);
router.delete('/:id', authMiddleware, deleteBrand);

export default router;