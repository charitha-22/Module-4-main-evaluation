import express from "express";
import userRouter from "./routes/user.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import vehicleRouter from "./routes/vehicle.routes.js";
import tripRouter from "./routes/trips.routes.js";


const app = express();
app.use(express.json());
// app.use(logger);

app.use("/users", userRouter)
app.use("/vehicles", vehicleRouter)
app.use("/trip", tripRouter)

app.use((req,res)=>{
    res.status(404).json({msg: "This Request is not found"});
});

app.listen(3000, ()=>console.log("Server Running"));