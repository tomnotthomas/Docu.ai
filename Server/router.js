import express from 'express';
import getDocuments from './Controllers/s3bucket-controller.js';
import analyseDoc from './Controllers/image-analyser-controller.js'
import upload from './Controllers/image-upload-controller.js'
import multiparty from 'connect-multiparty'

const multipartyMiddleware = multiparty();

const router = express.Router();

//get all the documents in the s3 bucket
router.get('/documents', getDocuments)
//analyse the document 
router.post('/analysedoc', analyseDoc)
//upload the document
router.post('/uploaddoc', multipartyMiddleware, upload)
export default router;