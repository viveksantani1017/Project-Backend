"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const pino_1 = __importDefault(require("pino"));
const logFilePath = process.env.LOG_FILE_PATH || path_1.default.join(__dirname, '..', 'logs', `${Intl.DateTimeFormat('sv-SE').format(new Date())}.log`);
const logFileSize = process.env.LOG_FILE_SIZE || '10M';
const logFrequency = process.env.LOG_FREQUENCY || 'daily';
const logger = (0, pino_1.default)(pino_1.default.transport({
    target: 'pino-roll',
    options: {
        file: logFilePath,
        size: logFileSize,
        frequency: logFrequency,
        mkdir: true,
        extension: '.log',
    }
}));
exports.default = logger;
//# sourceMappingURL=logger.js.map