import {Injectable} from '@angular/core';
import {CartItem} from '../model/base/cart-item';
import {BehaviorSubject} from 'rxjs';
import {Price} from '../model/base/i-order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  _items: CartItem[];

  constructor() {
    this._items = [
      {
        name: 'Příspěvek',
        quantity: 1,
        price: {
          amount: 10,
          currency: 'CZK'
        }
      },
      {
        name: 'Příspěvek',
        quantity: 1,
        price: {
          amount: 199,
          currency: 'CZK'
        }
      },
      {
        name: 'Předplatné bez reklam',
        quantity: 1,
        price: {
          amount: 249,
          currency: 'CZK'
        }
      }
    ];
    // this.items.next(this._items);
    this.items.subscribe((items: CartItem[]) => this._items = items);
  }

  add(item: CartItem): void {
    this._items.push(item);
    this.items.next(this._items);
  }

  update(item: CartItem): void {
    const it = this.find(item);
    if (it) {
      it.name = item.name;
      it.quantity = item.quantity;
      it.price = item.price;
      this.items.next(this._items);
    } else {
      this.add(item);
    }
  }

  remove(item: CartItem): void {
    const index = this.findIndex(item);
    if (index !== -1) {
      this._items.slice(index);
      this.items.next(this._items);
    }
  }

  totalPrice() {
    const result = {};
    const currenciesInCart = Array.from(new Set(this._items.map(it => it.price.currency)));
    for (const currency of currenciesInCart) {
      const price: Price = {
        amount: this._items.filter(it => it.price.currency === currency).map(it => it.price.amount * it.quantity).reduce((a, b) => a + b, 0),
        currency: currency
      };
      result[currency.toLowerCase()] = price;
    }
    return result;
  }

  pop() {
    this._items.pop();
    this.items.next(this._items);
  }

  private find(item: CartItem): CartItem | null {
    return this._items.find(it => it.name === item.name);
  }

  private findIndex(item: CartItem): number {
    return this._items.findIndex(it => it.name === item.name);
  }
}
