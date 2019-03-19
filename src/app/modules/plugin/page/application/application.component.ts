import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../../shared/service/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IApplication} from '../../../../shared/model/base/i-application';
import {ApplicationContextService} from '../../service/application-context.service';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {User} from '../../../../shared/model/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IOrder, Status} from '../../../../shared/model/base/i-order';
import {CartService} from '../../../../shared/service/cart.service';
import {HttpResponse} from '@angular/common/http';
import {OrderService} from '../../../../shared/service/order.service';
import {Price} from '../../../../shared/model/base/price';
import { WindowService } from 'src/app/shared/service/window.service';

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
  totalProducts: number;
  cartToggle = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private w: WindowService,
              private authenticationService: AuthenticationService,
              private applicationService: ApplicationService,
              private applicationContextService: ApplicationContextService,
              private cartService: CartService,
              private orderService: OrderService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'use-remembered-card': [true, null],
      'auto-renew': [false, null]
    });
    this.toggleDisabledState(this.formDisabled);
  }

  ngOnInit() {
    this.sendMessage('lg');
    this.loadData();
  }

  sendMessage(size: string) {
    if (this.w.nativeWindow['parentIFrame']) {
      this.w.nativeWindow['parentIFrame'].sendMessage({action: 'layout', data: size});
    }
  }

  loadData() {
    this.authenticationService.loggedUser.subscribe((user: User) => this.user = user);
    this.applicationContextService.order.subscribe((order: IOrder) => {
      this.order = order;

      if (order) {
        this.cartService.setProducts(order.products);
        this.formDisabled = order.status === Status.PAID;
      }
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
  }

  createOrder(): void {
    if (this.form.valid && !this.cartService.empty()) {
      const products = this.cartService.items.getValue();

      this.orderService.createOrder({
        appId: this.application.appId,
        products: products.map(el => {
          return {name: el.name, price: el.price, type: el.type};
        })
      }).subscribe((response: HttpResponse<any>) => {
        const location = response.headers.get('Location');
        if (location) {
          this.router.navigate([`/plugin/app/${this.application.appId}/status`], {queryParams: {order: location.split('/').pop()}});
        }
      });
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

  removeFromCart() {
    this.cartService.pop();
  }

  onCartChanged(items: number) {
    this.isCartEmpty = items === 0;
    this.totalProducts = this.cartService.totalProducts();

    const price = this.cartService.totalPrice();
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

  proceedToPayment() {
    console.log('Payment gateway');
  }

  logout(): void {
    this.authenticationService.logout().subscribe(() => {
        this.router.navigate(['/plugin/sign-in'], {queryParams: {redirect: this.route.snapshot['_routerState'].url}});
      },
      error => {
        console.log(error);
      });
  }
}
