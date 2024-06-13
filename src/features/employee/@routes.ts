import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";

import * as $getAll from "./getAll";
import * as $getById from "./getById";
import * as $add from "./add";
import * as $update from "./update";
import * as $delete from "./delete";

const router = Router();

router.get('/', requireAdmin, $getAll.handle);
router.get('/:id', requireAdmin, $getById.handle);
router.post('/', requireAdmin, $add.handle);
router.put('/:id', requireAdmin, $update.handle);
router.delete('/:id', requireAdmin, $delete.handle);

export default router;
