import express from 'express';
import analyseDoc from './Controllers/image-analyser-controller.js'
import upload from './Controllers/image-upload-controller.js'
import getStatusOfDocuments from './Controllers/status-of-documents-controller.js'
import getAllDocuments from './Controllers/get-all-documents-controller.js';

import multiparty from 'connect-multiparty'

const multipartyMiddleware = multiparty();

const router = express.Router();

//analyse the document and upload the information to the database
router.post('/analysedoc', analyseDoc)
//upload the document into the s3 bucket
router.post('/uploaddoc', multipartyMiddleware, upload)
//Get information on the invoice, the corresponding order, and the
//correspoinding POD document
router.get('/statusofdocuments', getStatusOfDocuments)
//Get all documents and their information
router.get('/alldocuments', getAllDocuments)

export default router;