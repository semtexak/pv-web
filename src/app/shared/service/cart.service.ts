import {Injectable} from '@angular/core';
import {CartItem} from '../model/base/cart-item';
import {BehaviorSubject} from 'rxjs';
import {IProduct} from '../model/base/i-order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  _items: IProduct[];

  constructor() {
    this.items.subscribe((items: IProduct[]) => this._items = items);
  }

  setProducts(items: IProduct[]) {
    this.items.next(items);
  }

  add(item: IProduct, first: boolean = false): void {
    if (first) {
      this._items.unshift(item);
    } else {
      this._items.push(item);
    }
    this.items.next(this._items);
  }

  update(item: IProduct): void {
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

  remove(item: IProduct): void {
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
      result[currency.toLowerCase()] = {
        amount: this._items.filter(it => it.price.currency === currency).map(it => it.price.amount * it.quantity).reduce((a, b) => a + b, 0),
        currency: currency
      };
    }
    return result;
  }

  totalProducts(): number {
    return this._items.length;
  }

  pop() {
    this._items.pop();
    this.items.next(this._items);
  }

  empty(): boolean {
    return this._items.length === 0;
  }

  private find(item: IProduct): IProduct | null {
    return this._items.find(it => it.name === item.name);
  }

  private findIndex(item: IProduct): number {
    return this._items.findIndex(it => it.name === item.name);
  }
}
