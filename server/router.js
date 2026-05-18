import express from 'express';
import analyseDoc from './controllers/image-analyser.js';
import upload from './controllers/image-upload.js';
import getStatusOfDocuments from './controllers/status-docs.js'
import getAllDocuments from './controllers/get-all-documents.js';
import deleteStatusOfDocuments from './controllers/status-docs-deletetion.js';
import multiparty from 'connect-multiparty';

const multipartyMiddleware = multiparty();

const router = express.Router();

//analyse the document and upload the information to the database
router.post('/analysedoc', analyseDoc);
//upload the document into the s3 bucket
router.post('/uploaddoc', multipartyMiddleware, upload);
//Get information on the invoice, the corresponding order, and the
//correspoinding POD document
router.post('/statusofdocuments', getStatusOfDocuments);
//Get all documents and their information
router.get('/alldocuments', getAllDocuments);

router.delete('/statusofdocuments', deleteStatusOfDocuments);

export default router;
