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
exports.requireUser = exports.requireAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const constants_1 = require("../utils/constants");
function getLoggedInUserFromToken(authHeader) {
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return undefined;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || "");
        return {
            userId: decodedToken.userId,
            userType: decodedToken.role
        };
    }
    catch (error) {
        console.error(error);
        logger_1.default.error(error);
        return undefined;
    }
}
function requireAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const loggedInUser = getLoggedInUserFromToken(request.headers['authorization']);
        if ((loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.userType) !== constants_1.UserType.Admin) {
            response.status(401).json();
            return;
        }
        request.user = loggedInUser;
        next();
    });
}
exports.requireAdmin = requireAdmin;
function requireUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const loggedInUser = getLoggedInUserFromToken(request.headers['authorization']);
        if (!loggedInUser) {
            response.status(401).json();
            return;
        }
        request.user = loggedInUser;
        next();
    });
}
exports.requireUser = requireUser;
//# sourceMappingURL=auth.js.map