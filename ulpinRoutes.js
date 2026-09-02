import express from 'express';
import { generateUlpinController } from './ulpinController.js';

const router = express.Router();

router.post('/generate', generateUlpinController);

export default router;