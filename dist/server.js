"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const exceptionHandler_1 = __importDefault(require("./middleware/exceptionHandler"));
const requestLogger_1 = __importDefault(require("./middleware/requestLogger"));
const _routes_1 = __importDefault(require("./features/companies/@routes"));
const _routes_2 = __importDefault(require("./features/employee/@routes"));
const _routes_3 = __importDefault(require("./features/customer/@routes"));
const _routes_4 = __importDefault(require("./features/vendor/@routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(requestLogger_1.default);
app.use(express_1.default.json());
// Endpoints
app.use('/api/companies', _routes_1.default);
app.use('/api/customer', _routes_3.default);
app.use('/api/vendor', _routes_4.default);
app.use('/api/employee', _routes_2.default);
// MUST BE LAST!
app.use(exceptionHandler_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map