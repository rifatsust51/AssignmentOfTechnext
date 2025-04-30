import express from 'express';
import { protect } from '../middlewares/auth.middlware';
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from '../controllers/project.controller';

const router = express.Router();

router.use(protect);

router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
