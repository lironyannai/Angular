import express from "express";
import cors from "cors";
import { sample_equipments } from "./data";

const app = express();
//localhost:4200
//localhost:8000
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

const port = 8000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
