import { createTrip, deleteTrip, getTripById, updateTrip } from "../controllers/trip.controller.js";
import express from "express";

const tripRouter = express.Router();
tripRouter.post("/create", createTrip);
tripRouter.get("/:tripId", getTripById);
tripRouter.patch("/update/:tripId", updateTrip);
tripRouter.delete("/delete/:tripId", deleteTrip);

export default tripRouter;