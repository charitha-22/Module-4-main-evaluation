import { createTrip } from "../controllers/trip.controller.js";
import express from "express";

const tripRouter = express.Router();
tripRouter.post("/create", createTrip);

export default tripRouter;