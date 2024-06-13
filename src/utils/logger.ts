import path from 'path';
import pino from 'pino';

const logFilePath = process.env.LOG_FILE_PATH || path.join(__dirname, '..', 'logs', `${Intl.DateTimeFormat('sv-SE').format(new Date())}.log`);
const logFileSize = process.env.LOG_FILE_SIZE || '10M';
const logFrequency = process.env.LOG_FREQUENCY || 'daily';

const logger = pino(pino.transport({
    target: 'pino-roll',
    options: {
        file: logFilePath,
        size: logFileSize,
        frequency: logFrequency,
        mkdir: true,
        extension: '.log',
    }
}));

export default logger;
