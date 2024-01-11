import express from 'express';
import getDocuments from './Controllers/s3bucket-controller.js';
import analyseDoc from './Controllers/image-analyser-controller.js'
const router = express.Router();

router.get('/documents', getDocuments)
router.post('/analysedoc', analyseDoc)

export default router;