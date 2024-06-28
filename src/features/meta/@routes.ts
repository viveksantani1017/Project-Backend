import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";


import * as $getAllEmployeeTypes from "./getAllEmployeeTypes";
import * as $getAllTimingAvailabilty from "./getAllTimingAvailabilty";
import * as $getAllTimesheetApprovalLevels from "./getAlltimesheetApprovalLevels";
import * as $getAllTechnologies from "./getAllTechnologies";
import * as $getAllAllocationTypes from "./getAllAllocationTypes";
import * as $getAllTimesheetTypes from "./getAllTimesheetTypes";
import * as $getAllModeOfPayments from "./getAllModeOfPayments";


const router = Router();

router.get('/getAllEmployeeTypes', $getAllEmployeeTypes.handle);
router.get('/getAllTimingAvailabilty',  $getAllTimingAvailabilty.handle);
router.get('/getAllTimesheetApprovalLevels', $getAllTimesheetApprovalLevels.handle);
router.get('/getAllTechnologies', $getAllTechnologies.handle);
router.get('/getAllAllocationTypes', $getAllAllocationTypes.handle);
router.get('/getAllTimesheetTypes', $getAllTimesheetTypes.handle);
router.get('/getAllModeOfPayments', $getAllModeOfPayments.handle);

export default router;
