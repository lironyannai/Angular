import { Router } from 'express'
import { sample_equipments, sample_tags } from '../data';

const router = Router();


router.get("/", (req, res) => {
    res.send(sample_equipments);
})

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const equipments = sample_equipments.filter(equipment => equipment.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(equipments);

})

router.get("/tags", (req, res) => {
    res.send(sample_tags);
})

router.get("/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const equipments = sample_equipments
        .filter(equipment => equipment.tags?.includes(tagName));
    res.send(equipments);
})

router.get("/:equipmentId", (req, res) => {
    const equipmentId = req.params.equipmentId;
    const equipment = sample_equipments.find(equipment => equipment.id == equipmentId);
    res.send(equipment);
})


export default router;