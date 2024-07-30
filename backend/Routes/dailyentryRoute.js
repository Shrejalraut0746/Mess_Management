import express from 'express';
import { Router } from 'express';
import { getUserEntryDetail ,updateDailyEntry} from '../Controller/dailyentryController.js';

const dailyentryRouter=Router();
dailyentryRouter.get("/getdailyentry/:userId",getUserEntryDetail);
dailyentryRouter.patch("/updateentry",updateDailyEntry);

export default dailyentryRouter;