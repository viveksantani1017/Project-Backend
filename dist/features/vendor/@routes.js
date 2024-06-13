"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const $getAll = __importStar(require("./getAll"));
const $getById = __importStar(require("./getById"));
const $add = __importStar(require("./add"));
const $update = __importStar(require("./update"));
const $delete = __importStar(require("./delete"));
const router = (0, express_1.Router)();
router.get('/', auth_1.requireAdmin, $getAll.handle);
router.get('/:id', auth_1.requireAdmin, $getById.handle);
router.post('/', auth_1.requireAdmin, $add.handle);
router.put('/:id', auth_1.requireAdmin, $update.handle);
router.delete('/:id', auth_1.requireAdmin, $delete.handle);
exports.default = router;
//# sourceMappingURL=@routes.js.map