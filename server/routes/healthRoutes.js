import express from 'express';
import { getHealth } from '../controllers/healthController.js';

const router = express.Router();

// Define health check route
router.get('/', getHealth);

export default router;
