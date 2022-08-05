import express from "express";
import cors from "cors";
import { sample_equipments, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
//localhost:4200
//localhost:8000

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/equipments", (req, res) => {
    res.send(sample_equipments);
})

app.get("/api/equipments/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const equipments = sample_equipments.filter(equipment => equipment.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(equipments);

})

app.get("/api/equipments/tags", (req, res) => {
    res.send(sample_equipments);
})

app.get("/api/equipments/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const equipments = sample_equipments
        .filter(equipment => equipment.tags?.includes(tagName));
    res.send(equipments);
})

app.get("/api/equipments/:equipmentId", (req, res) => {
    const equipmentId = req.params.equipmentId;
    const equipment = sample_equipments.find(equipment => equipment.id == equipmentId);
    res.send(equipment);
})

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
