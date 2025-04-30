import express from 'express';
import { protect } from '../middlewares/auth.middlware';
import { createClient, getClients, updateClient, deleteClient } from '../controllers/client.controller';

const router = express.Router();

router.use(protect);

router.post('/', createClient);
router.get('/', getClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
