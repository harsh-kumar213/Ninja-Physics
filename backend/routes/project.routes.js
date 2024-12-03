import express from 'express';
import {createProject,updateProject,getProject,getProjects} from '../controllers/project.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router  = express.Router();

router.post('/',upload,createProject);
router.route('/:id').get(getProject).patch(updateProject);
router.get('/',getProjects);

export default router;