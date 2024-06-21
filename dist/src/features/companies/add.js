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
    paymentTerms: joi_1.default.string().required(),
    bankName: joi_1.default.string().required(),
    accountName: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().required(),
    ifscCode: joi_1.default.string().required(),
    micr: joi_1.default.string().required(),
    cancelledChequeImageName: joi_1.default.string().required(),
});
function handle(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const requestData = Object.assign(Object.assign({}, request.body), { cancelledChequeImageName: (_a = request.file) === null || _a === void 0 ? void 0 : _a.filename });
        if (!requestData.cancelledChequeImageName)
            return response
                .status(400)
                .json({ error: "Cancelled Cheque Image is required" });
        const customRequest = requestData;
        const { error } = validator.validate(customRequest);
        if (error)
            response.status(400).json({ error: error.message });
        const accountDetails = yield database_1.default.accountDetails.create({
            data: {
                bankName: customRequest.bankName,
                accountName: customRequest.accountName,
                accountNumber: customRequest.accountNumber,
                ifscCode: customRequest.ifscCode,
                micr: customRequest.micr,
                cancelledChequeImageName: customRequest.cancelledChequeImageName,
            },
        });
        yield database_1.default.company.create({
            data: {
                companyCode: customRequest.companyCode,
                companyName: customRequest.companyName,
                companyAddress: customRequest.companyAddress,
                gstn: customRequest.gstn,
                panCardNumber: customRequest.panCardNumber,
                contactPersonName: customRequest.contactPersonName,
                contactPersonNumber: customRequest.contactPersonNumber,
                paymentTerms: customRequest.paymentTerms,
                accountDetailsId: accountDetails.id,
            },
        });
        logger_1.default.info("Company added");
        response.status(200).send();
    });
}
exports.handle = handle;
//# sourceMappingURL=add.js.map