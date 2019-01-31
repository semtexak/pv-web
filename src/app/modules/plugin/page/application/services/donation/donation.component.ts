import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ApplicationContextService} from '../../../../service/application-context.service';
import {IApplication} from '../../../../../../shared/model/base/i-application';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../../../../../shared/service/cart.service';
import {CartItem} from '../../../../../../shared/model/base/cart-item';
import {ProductType} from '../../../../../../shared/model/base/i-order';

@Component({
  selector: 'pv-donation',
  templateUrl: './donation.component.html'
})
export class DonationComponent implements OnInit {

  aplication: IApplication;
  form: FormGroup;
  select: boolean;
  donationConfiguration: any;
  customPrice: number = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _location: Location,
              private formBuilder: FormBuilder,
              private cartService: CartService,
              private applicationContextService: ApplicationContextService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'price': [null, Validators.compose([Validators.required])]
    });

    this.route.queryParams.subscribe(params => {
      this.select = params['select'] !== undefined;
    });
    this.applicationContextService.application.subscribe((app: IApplication) => {
      this.aplication = app;
      console.log(this.aplication.configurations);
      const cfg = app.configurations.find(config => config.type === 'donation');
      if (cfg) {
        this.donationConfiguration = cfg;
      } else if (!cfg && app.configurations.length > 0) {
        this.router.navigate([app.configurations.pop().type], {relativeTo: this.route});
      } else {
        this.router.navigate(['/no-service-available'], {relativeTo: this.route});
      }
    });
  }

  selectDonate() {
    this.router.navigate([], {queryParams: {select: true}, relativeTo: this.route});
  }

  addToCart() {
    if (this.form.valid) {
      const product: CartItem = {
        name: `Příspěvek (${this.aplication.domain})`,
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

  goBack() {
  }

}
