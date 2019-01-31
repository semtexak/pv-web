import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from '../../../model/base/cart-item';
import {IProduct} from '../../../model/base/i-order';

@Component({
  selector: 'pv-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnInit {

  @Input('item') item: IProduct;

  constructor() { }

  ngOnInit() {
  }

}
