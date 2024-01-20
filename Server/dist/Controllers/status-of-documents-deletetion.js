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
const deleteStatusOfDocuments = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield StatusOfDocuments.findOneAndDelete({ workpackage: req.body.vorgang });
            if (!result) {
                return res.status(200).send('No documents to delete :)');
            }
            res.status(200).send('All Good!');
        }
        catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    });
};
export default deleteStatusOfDocuments;
