import express from 'express';
import { createIdea, deleteIdea, getAllIdeas, getIdea, updateIdea } from '../controllers/idea.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router  = express.Router();

router.route('/').get(getAllIdeas);
router.post('/',upload,createIdea);
router.patch('/:id',upload,updateIdea);
router.route('/:id').get(getIdea).delete(deleteIdea);

export default router;
