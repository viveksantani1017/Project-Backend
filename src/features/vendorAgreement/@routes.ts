import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";

import multer, { StorageEngine } from "multer";
import fs from "fs";

import * as $getAll from "./getAll";
import * as $getById from "./getById";
import * as $add from "./add";
import * as $getByVendorId from "./getByVendorId";
import * as $delete from "./delete";

// Configure Multer for file upload
const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = "";
        if (file.fieldname === "agreementFile") {
            dir = "uploads/Agreement Files";
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
        if (file.fieldname === "agreementFile") {
            req.body.agreementFilename = `${Date.now()}-${file.originalname}`;
        }
    },
});

const upload = multer({ storage });

const router = Router();

router.get("/", requireAdmin, $getAll.handle);
router.get("/:id", requireAdmin, $getById.handle);
router.get("/vendor/:id", requireAdmin, $getByVendorId.handle);
router.post(
    "/:id",
    requireAdmin,
    upload.single("agreementFile"),
    $add.handle
);
router.delete("/:id", requireAdmin, $delete.handle);

export default router;
