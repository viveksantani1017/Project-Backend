import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";

import multer, { StorageEngine } from 'multer';
import fs from 'fs';

import * as $getAll from "./getAll";
import * as $getById from "./getById";
import * as $add from "./add";
import * as $update from "./update";
import * as $delete from "./delete";


// Configure Multer for file upload
const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = 'uploads/Cancelled Cheque Images'
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
      if(file.fieldname === 'cancelledChequeImage')
        {
          req.body.cancelledChequeImageName = `${Date.now()}-${file.originalname}`;
        }
    }
  });
  
const upload = multer({ storage });

const router = Router();

router.get('/', requireAdmin, $getAll.handle);
router.get('/:id', requireAdmin, $getById.handle);
router.post('/',requireAdmin, upload.fields([{name:'cancelledChequeImage',maxCount:1}]), $add.handle);
router.put('/:id', requireAdmin, $update.handle);
router.delete('/:id', requireAdmin, $delete.handle);

export default router;
