var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StatusOfDocuments from "../Models/status-of-documents-model.js";
import RawTextOutput from "../Models/raw-ocr-output-model.js";
const getStatusOfDocuments = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Get the name
        const nameOfDoc = req.body.vorgang;
        //TODO create helper function that finds the document you are lookging for
        //TODO Get the corresponding invoice
        function findDocument(docType, name, i) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log(docType + name + '-' + i + '.jpg');
                    //TODO find all document pages that correspond to the name of the transaction
                    const foundDoc = yield RawTextOutput.findOne({
                        filename: docType + name + '-' + i + '.jpg'
                    });
                    console.log(foundDoc);
                    if (foundDoc) {
                        const data = foundDoc.toObject();
                        return JSON.stringify(data);
                    }
                    else {
                        return false;
                    }
                }
                catch (err) {
                    console.log(err);
                }
            });
        }
        function getAllPages(docType) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    //Loop through all the pages
                    let foundDocs = [];
                    for (let i = 0;; i++) {
                        const doc = yield findDocument(docType, nameOfDoc, i);
                        if (doc) {
                            foundDocs.push(doc);
                        }
                        else {
                            break;
                        }
                    }
                    return foundDocs;
                }
                catch (err) {
                    console.log(err);
                }
            });
        }
        //function that creates one large object that entails all the documents for one nameOfdoc
        function getAllPagesOfAllThreeDocs() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const allDocswithAllPages = ({
                        Rechnung: yield getAllPages('Rechnung'),
                        Auftrag: yield getAllPages('Auftrag'),
                        POD: yield getAllPages('POD')
                    });
                    //Write this to the database
                    const allPagesAndInfo = yield StatusOfDocuments.create({
                        workpackage: req.body.vorgang,
                        documents: JSON.stringify(allDocswithAllPages)
                    });
                    res.status(201).send(allPagesAndInfo);
                }
                catch (err) {
                    console.log(err);
                }
            });
        }
        return getAllPagesOfAllThreeDocs();
        //if it doesnt exist, return null
        //TODO check all documents that belong to that invoice for amount and transport number
        //TODO get the corresponding order
        //TODO find all order document pages that correspond to the name of the transaction.
        //if it doesn't exist, return null
        //TODO check all documents that belong to that order for the amount and transport number
        //transport number is only a boolean here.
        //
        //TODO get the corresponding pod
        //TODO find all pd document pages that correspond to the name of the transaction.
        //if it doesn't exist, return null
        //TODO check all documents that belong to that pod for a signature
    });
};
export default getStatusOfDocuments;
