import express from 'express';
import { registerShip } from '../controllers/ship.controller.js';
import { registerExcelTemplate } from '../controllers/excel.controller.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/registerShip', registerShip);
router.post('/uploadExcel', upload.single('file'), registerExcelTemplate);


export default router;
