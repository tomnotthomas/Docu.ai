"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_of_documents_model_ts_1 = __importDefault(require("../Models/status-of-documents-model.ts"));
const getAllDocuments = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allDocuments = yield status_of_documents_model_ts_1.default.find({});
            res.status(201).send(allDocuments);
        }
        catch (err) {
            console.error("Error:", err);
            res.status(500).send(err);
        }
    });
};
exports.default = getAllDocuments;
