import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";

import multer, { StorageEngine } from "multer";
import fs from "fs";

import * as $getAll from "./getAll";
import * as $getById from "./getById";
import * as $add from "./add";
import * as $update from "./update";
import * as $delete from "./delete";

// Configure Multer for file upload
const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = "";
        if (file.fieldname === "cancelledChequeImage") {
            dir = "uploads/Cancelled Cheque Images";
        } else if (file.fieldname === "pancard") {
            dir = "uploads/Pancard Images";
        } else if (file.fieldname === "gst") {
            dir = "uploads/GST Images";
        } else if (
            file.fieldname === "agreementFile1" ||
            file.fieldname === "agreementFile2" ||
            file.fieldname === "agreementFile3" ||
            file.fieldname === "agreementFile4"
        ) {
            dir = "uploads/Agreement Files";
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
        if (file.fieldname === "cancelledChequeImage") {
            req.body.cancelledChequeImageName = `${Date.now()}-${
                file.originalname
            }`;
        } else if (file.fieldname === "pancard") {
            req.body.pancardUpload = `${Date.now()}-${file.originalname}`;
        } else if (file.fieldname === "gst") {
            req.body.gstnUpload = `${Date.now()}-${file.originalname}`;
        } else if (file.fieldname === "agreementFile1") {
            req.body.agreementFileName1 = `${Date.now()}-${file.originalname}`;
        } else if (file.fieldname === "agreementFile2") {
            req.body.agreementFileName2 = `${Date.now()}-${file.originalname}`;
        } else if (file.fieldname === "agreementFile3") {
            req.body.agreementFileName3 = `${Date.now()}-${file.originalname}`;
        } else if (file.fieldname === "agreementFile4") {
            req.body.agreementFileName4 = `${Date.now()}-${file.originalname}`;
        }
    },
});

const upload = multer({ storage });

const router = Router();

router.get("/", requireAdmin, $getAll.handle);
router.get("/:id", requireAdmin, $getById.handle);
router.post(
    "/",
    requireAdmin,
    upload.fields([
        { name: "cancelledChequeImage", maxCount: 1 },
        { name: "pancard", maxCount: 1 },
        { name: "gst", maxCount: 1 },
        { name: "agreementFile1", maxCount: 1 },
        { name: "agreementFile2", maxCount: 1 },
        { name: "agreementFile3", maxCount: 1 },
        { name: "agreementFile4", maxCount: 1 },
    ]),
    $add.handle
);
router.put("/:id", requireAdmin, $update.handle);
router.delete("/:id", requireAdmin, $delete.handle);

export default router;
