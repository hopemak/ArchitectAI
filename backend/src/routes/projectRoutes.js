import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getProjects,
  getProject,
  createProject,
  generateBlueprint,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

router.use(protect);

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.post('/:id/generate', generateBlueprint);
router.delete('/:id', deleteProject);

export default router;
