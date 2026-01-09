// cron/index.js
import cron from "node-cron";
import { cleanupTempImages } from "./cleanupCloudinary.js";

export const startCronJobs = () => {
  cron.schedule("0 * * * *", cleanupTempImages); // mỗi 1h
};
