import dotenv from 'dotenv'
dotenv.config();



import express from "express";
import cors from "cors";
import equipmentRouter from './routers/equipment.router';
import userRouter from "./routers/user.router";
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
//localhost:4200
//localhost:8000

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));


app.use("/api/equipments", equipmentRouter);
app.use("/api/users", userRouter);


const port = 8000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
