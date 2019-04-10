import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ApplicationContextService} from '../../../../service/application-context.service';
import {IApplication} from '../../../../../../shared/model/base/i-application';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../../../../../shared/service/cart.service';
import {CartItem} from '../../../../../../shared/model/base/cart-item';
import {ProductType} from '../../../../../../shared/model/base/i-order';
import {AuthenticationService} from '../../../../../../shared/service/authentication.service';
import {User} from '../../../../../../shared/model/user';
import {map} from 'rxjs/operators';
import {WindowService} from '../../../../../../shared/service/window.service';

@Component({
  selector: 'pv-donation',
  templateUrl: './donation.component.html'
})
export class DonationComponent implements OnInit {

  application: IApplication;
  form: FormGroup;
  select: boolean;
  donationConfiguration: any;
  isLogged: boolean = false;
  // customPrice: number = 0;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private _location: Location,
              private w: WindowService,
              private formBuilder: FormBuilder,
              private cartService: CartService,
              private applicationContextService: ApplicationContextService) {
    this.form = this.formBuilder.group({
      'price': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.select = params['select'] !== undefined;
    });
    this.authenticationService.loggedUser.pipe(map((user: User) => !(user === undefined || user === null))).subscribe((isLogged: boolean) => this.isLogged = isLogged);
    this.applicationContextService.application.subscribe((app: IApplication) => {
      this.application = app;

      if (app) {
        const cfg = app.configurations.find(config => config.type === 'donation');
        if (cfg) {
          this.donationConfiguration = cfg;
        } else if (!cfg && app.configurations.length > 0) {
          this.router.navigate([app.configurations[0].type], {relativeTo: this.route});
        } else {
          this.router.navigate(['/no-service-available'], {relativeTo: this.route});
        }
      }
    });
  }

  selectDonate() {
    this.router.navigate([], {queryParams: {select: true}, relativeTo: this.route});
  }

  addToCart() {
    if (this.form.valid) {
      const product: CartItem = {
        name: `Příspěvek (${this.application.domain})`,
        quantity: 1,
        type: ProductType.DONATION,
        price: {
          amount: this.form.controls['price'].value,
          currency: 'CZK'
        }
      };
      this.cartService.add(product, true);
    }
  }

  addOrEditToCart(amount: number, recurent: boolean = false) {
    this.cartService.clear();
    const product: CartItem = {
      name: `Příspěvek (${recurent ? 'měsíční' : 'jednorázový'})`,
      quantity: 1,
      type: ProductType.DONATION,
      price: {
        amount: amount,
        currency: 'CZK'
      },
      data: {
        recurent: recurent
      }
    };
    this.cartService.add(product, true);
  };

  goBack() {
  }

  sendCloseMessage() {
    if (this.w.nativeWindow['parentIFrame']) {
      this.w.nativeWindow['parentIFrame'].sendMessage({action: 'close'});
    }
  }

}
