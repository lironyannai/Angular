import { Injectable } from '@angular/core';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Equipment } from '../shared/models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  ructor() { }

  constructor() { }

  addToCart(equipment: Equipment): void {
    let cartItem = this.cart.items.find(item => item.equipment.id === equipment.id)
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(equipment));
    this.setCartToLocalStorage();
  }

  removeFromCart(equipmentId: string): void {
    this.cart.items = this.cart.items.filter(item => item.equipment.id != equipmentId);
    this.setCartToLocalStorage();

  }

  changeQuantity(equipmentId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.equipment.id === equipmentId);
    if (!cartItem)
      return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.equipment.price;
    this.setCartToLocalStorage();

  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();

  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0)
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}

