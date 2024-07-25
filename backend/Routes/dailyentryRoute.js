import express from 'express';
import { Router } from 'express';
import { getUserEntryDetail} from '../Controller/dailyentryController.js';

const dailyentryRouter=Router();
dailyentryRouter.get("/getdailyentry/:userId",getUserEntryDetail);

export default dailyentryRouter;