import express from 'express';
import { protect } from '../middlewares/auth.middlware';
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder
} from '../controllers/reminder.controller';

const router = express.Router();

router.use(protect);

router.post('/', createReminder);
router.get('/', getReminders);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

export default router;
