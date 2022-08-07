import { Router } from 'express'
import { sample_equipments, sample_tags } from '../data';
import asyncHandler from 'express-async-handler'
import { EquipmentModel } from '../models/equipment.mode';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const equipmentsCount = await EquipmentModel.countDocuments();
        if (equipmentsCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await EquipmentModel.create(sample_equipments);
        res.send("Seed Is Done!");
    }
))


router.get("/", asyncHandler(
    async (req, res) => {
        const equipments = await EquipmentModel.find();
        res.send(equipments);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const equipments = await EquipmentModel.find({ name: { $regex: searchRegex } });
        res.send(equipments);

    }
))

router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await EquipmentModel.aggregate([{
            $unwind: '$tags'
        },
        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                count: '$count'
            }
        }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            count: await EquipmentModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const equipments = await EquipmentModel.find({
            tags: req.params.tagName
        })
        res.send(equipments);
    })
)

router.get("/:equipmentId", asyncHandler(
    async (req, res) => {
        const equipment = await EquipmentModel.findById(req.params.equipmentId)
        res.send(equipment);
    })
)


export default router;