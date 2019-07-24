import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/shared/model/base/cart-item';
import { CartService } from 'src/app/shared/service/cart.service';
import { ApplicationContextService } from 'src/app/modules/plugin/service/application-context.service';
import { IApplication } from 'src/app/shared/model/base/i-application';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { ProductType } from 'src/app/shared/model/base/i-order';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'pv-purchase',
  templateUrl: './purchase.component.html'
})
export class PurchaseComponent implements OnInit {

  form: FormGroup;
  application: IApplication;
  isLogged: boolean;
  donationConfiguration: any;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private applicationContextService: ApplicationContextService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'price': [null, Validators.compose([Validators.required])]
    });
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
    this.authenticationService.loggedUser.pipe(map((user: User) => !(user === undefined || user === null))).subscribe((isLogged: boolean) => this.isLogged = isLogged);
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


  addOrEditToCart(amount: number, recurrent: boolean = false) {
    this.cartService.clear();
    const product: CartItem = {
      name: `Příspěvek (${recurrent ? 'měsíční' : 'jednorázový'})`,
      quantity: 1,
      type: ProductType.DONATION,
      price: {
        amount: amount,
        currency: 'CZK'
      },
      data: {
        recurrent: recurrent
      }
    };
    this.cartService.add(product, true);
  };

}
