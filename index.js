import express from "express";
import userRouter from "./routes/user.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import vehicleRouter from "./routes/vehicle.routes.js";


const app = express();
app.use(logger)
app.use(express.json());

app.use("/users", userRouter)
app.use("/vehicles", vehicleRouter)
app.use("/trip")

app.use((req,res)=>{
    res.status(404).json({msg: "This Request is not found"});
});

app.listen(3000, ()=>console.log("Server Running"));