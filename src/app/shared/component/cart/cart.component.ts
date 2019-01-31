import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {CartItem} from '../../model/base/cart-item';
import {IProduct} from '../../model/base/i-order';

@Component({
  selector: 'pv-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  @Input('compactMode') mode = false;
  @Output('onChange') onChanged: EventEmitter<number> = new EventEmitter();
  items: IProduct[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.items.subscribe((items: IProduct[]) => {
      this.onChanged.emit(items.length);
      this.items = items;
    });
  }

}
