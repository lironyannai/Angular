import { Equipment } from "./Equipment";

export class CartItem {
    constructor(public equipment: Equipment) { }
    quantity: number = 1;
    price: number = this.equipment.price;
}