import express from "express";
import { assignDriver, createVehicle, getVehicle } from "../controllers/vehicle.controller.js";
import rateLimit from "express-rate-limit.js";

const vehicleRouter = express.Router();
vehicleRouter.post("/add", rateLimit, createVehicle);
vehicleRouter.patch("/assign-driver/:vehicleID", assignDriver);
vehicleRouter.get("/:vehicleId", getVehicle);

export default vehicleRouter;