import { model, Schema } from "mongoose";

export interface Equipment {
    id: string;
    name: string;
    price: number;
    tags: string[];
    favorite: boolean;
    stars: number;
    imageUrl: string;
    origins: string[];
    expirationTime: string;

}

export const EquipmentSchema = new Schema<Equipment>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        tags: { type: [String] },
        favorite: { type: Boolean, default: false },
        stars: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        origins: { type: [String], required: true },
        expirationTime: { type: String, required: true },
    }, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
}
);

export const EquipmentModel = model<Equipment>('equipment', EquipmentSchema);