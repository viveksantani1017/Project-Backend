"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
function exceptionHandler(_1, _2, response, next) {
    try {
        next();
    }
    catch (ex) {
        logger_1.default.error(ex);
        if (process.env.NODE_ENV === "development") {
            response.status(500).json({
                stack: ex.stack || {}
            });
        }
        else {
            logger_1.default.error(ex);
            response.status(500).json("Something went wrong");
        }
    }
}
exports.default = exceptionHandler;
//# sourceMappingURL=exceptionHandler.js.map