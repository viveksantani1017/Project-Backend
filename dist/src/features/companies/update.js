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
exports.handle = void 0;
const joi_1 = __importDefault(require("joi"));
const database_1 = __importDefault(require("../../utils/database"));
const logger_1 = __importDefault(require("../../utils/logger"));
const validator = joi_1.default.object({
    companyCode: joi_1.default.string().required(),
    companyName: joi_1.default.string().required(),
    companyAddress: joi_1.default.string().required(),
    gstn: joi_1.default.string().required(),
    panCardNumber: joi_1.default.string().required(),
    contactPersonName: joi_1.default.string().required(),
    contactPersonNumber: joi_1.default.string().required(),
    paymentTerms: joi_1.default.string().required()
});
function handle(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const customRequest = request.body;
        const { error } = validator.validate(customRequest);
        if (error)
            response.status(400).json({ error: error.message });
        const count = yield database_1.default.company.count({
            where: {
                id: parseInt(request.params.id),
                isDeleted: false
            }
        });
        if (count == 0) {
            response.status(404).json({ error: "Company not found" });
            return;
        }
        yield database_1.default.company.update({
            data: customRequest,
            where: { id: parseInt(request.params.id) }
        });
        logger_1.default.info(`Company with id ${request.params.id} updated`);
        response.status(200).send();
    });
}
exports.handle = handle;
//# sourceMappingURL=update.js.map