import express from "express";
import cors from "cors";
import { sample_equipments, sample_users } from "./data";
import jwt from "jsonwebtoken";
import equipmentRouter from './routers/equipment.router'

const app = express();
//localhost:4200
//localhost:8000

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));


app.use("/api/equipments", equipmentRouter);
app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email
        && user.password === password);

    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("User name or Password is not valid!");
    }
})

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;

}

const port = 8000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
