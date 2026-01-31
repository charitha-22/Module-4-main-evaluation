import express from "express";
import { assignDriver, createVehicle, getVehicle } from "../controllers/vehicle.controller.js";
import { rateLimiter } from "../middlewares/rateLimiter.middleware.js";

const vehicleRouter = express.Router();
vehicleRouter.post("/add", rateLimiter, createVehicle);
vehicleRouter.patch("/assign-driver/:vehicleID", assignDriver);
vehicleRouter.get("/:vehicleId", getVehicle);

export default vehicleRouter;