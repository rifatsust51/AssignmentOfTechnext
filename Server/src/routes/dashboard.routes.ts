import express from 'express';
import { protect } from '../middlewares/auth.middlware';
import  { getDashboard } from '../controllers/dashboard.controller';

const router = express.Router();
router.use(protect);
router.get('/', getDashboard);
export default router;
