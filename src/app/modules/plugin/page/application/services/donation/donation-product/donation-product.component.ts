import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from '../../../../../../../shared/model/base/cart-item';
import {ProductType} from '../../../../../../../shared/model/base/i-order';
import {CartService} from '../../../../../../../shared/service/cart.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pv-donation-product',
  templateUrl: './donation-product.component.html'
})
export class DonationProductComponent implements OnInit {

  @Input() recurrent = false;
  @Input() prices = [0, 49, 99, 149, 199];
  @Input() control: FormControl;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addOrEditToCart(amount: number) {
    this.cartService.clear();
    const product: CartItem = {
      name: `Příspěvek (${this.recurrent ? 'měsíční' : 'jednorázový'})`,
      quantity: 1,
      type: ProductType.DONATION,
      price: {
        amount: amount,
        currency: 'CZK'
      },
      data: {
        recurrent: this.recurrent
      }
    };
    this.cartService.add(product, true);
  };

}
