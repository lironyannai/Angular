import { CartItem } from "./CartItem";

export class Cart {
    items: CartItem[] = [];
    //new Cart() undefinded {}
    totalPrice: number = 0;
    totalCount: number = 0;

}