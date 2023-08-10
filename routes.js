import express from "express";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { aboutController } from "./controllers/about-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);
router.get("/dashboard", dashboardController.index);
router.get("/dashboard/deleteStation/:id", dashboardController.deleteStation);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/station/:id", stationController.index);
router.get("/station/:stationid/deletereading/:readingid", stationController.deleteReading);
router.post("/station/:id/addreading", stationController.addReading);
router.get("/about", aboutController.index);
router.get("/myAccount", accountsController.viewAccountDetails);
router.post("/updateAccount", accountsController.updateAccountDetails);
router.post("/station/:id/addreadingapi", stationController.addReadingAPI);

