import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../../shared/service/application.service';
import {ActivatedRoute} from '@angular/router';
import {IApplication} from '../../../../shared/model/base/i-application';
import {ApplicationContextService} from '../../service/application-context.service';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {User} from '../../../../shared/model/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IOrder, Price, Status} from '../../../../shared/model/base/i-order';
import {CartItem} from '../../../../shared/model/base/cart-item';
import {CartService} from '../../../../shared/service/cart.service';
import {interval} from 'rxjs';

@Component({
  selector: 'pv-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

  application: IApplication;
  order: IOrder;
  formDisabled: boolean = true;
  user: User;
  form: FormGroup;
  isCartEmpty: boolean = true;
  newOrder: {
    price: Price
  };
  OrderStatus = Status;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private applicationService: ApplicationService,
              private applicationContextService: ApplicationContextService,
              private cartService: CartService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'use-remembered-card': [true, null],
      'auto-renew': [false, null]
    });
    this.toggleDisabledState(this.formDisabled);
  }

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((user: User) => this.user = user);
    this.applicationContextService.order.subscribe((order: IOrder) => {
      this.order = order;
      this.formDisabled = order.status === Status.PAID;
      this.toggleDisabledState(this.formDisabled);
    });
    this.route.params.subscribe(params => {
      const appId = params['appId'];
      if (appId) {
        this.applicationService.getApplication(appId).subscribe((app: IApplication) => {
          this.application = app;
          this.applicationContextService.application.next(app);
        });
      }
    });

    interval(1000).subscribe((i) => {
      // this.addToCart('czk', i);
    });
  }

  onSubmit(data): void {
    if (this.form.valid) {
      console.log(data);
    }
  }

  toggleDisabledState(disabled: boolean) {
    for (const controlKey of Object.keys(this.form.controls)) {
      if (controlKey !== 'active' && controlKey !== 'type') {
        if (disabled) {
          this.form.controls[controlKey].disable();
        } else {
          this.form.controls[controlKey].enable();
        }

      }
    }
  }

  addToCart(currency: string, index: number) {
    const product: CartItem = {
      name: `Produkt ${index}`,
      quantity: 1,
      price: {
        amount: Math.round((Math.random() * 1000) + 1),
        currency: currency.toUpperCase()
      }
    };

    this.cartService.add(product);
  }

  removeFromCart() {
    this.cartService.pop();
  }

  onCartChanged(items: number) {
    this.isCartEmpty = items === 0;

    const price = this.cartService.totalPrice();
    console.log(price);
    if (price['czk']) {
      this.formDisabled = false;
      this.toggleDisabledState(this.formDisabled);
      this.newOrder = {
        price: price['czk']
      };
    } else {
      this.formDisabled = true;
      this.toggleDisabledState(this.formDisabled);
      this.newOrder = {
        price: {amount: 0, currency: 'CZK'}
      };
    }

  }
}
