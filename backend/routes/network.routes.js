import express from 'express';
import { getNetwork,getNetworks,createNetwork,deleteNetwork,updateNetwork } from '../controllers/network.controller.js';
import upload from '../middlewares/upload.middleware.js';
const router  = express.Router();

router.get('/',getNetworks);
router.post('/',upload,createNetwork);
router.route('/:id').delete(deleteNetwork).get(getNetwork);
router.patch('/:id',upload,updateNetwork);

export default router;