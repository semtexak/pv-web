import {Component} from '@angular/core';
import {IPageOrder} from '../../../shared/model/page/i-page-order';
import {OrderService} from '../../../shared/service/order.service';
import {LazyLoadEvent} from 'primeng/api';
import {Service} from '../../../shared/model/base/i-application';
import {IProduct, ProductType} from '../../../shared/model/base/i-order';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'pv-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  Service: typeof Service = Service;
  page: IPageOrder = {
    content: [],
    page: 0,
    empty: true,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };
  cols = [];
  filter: Map<string, any> = new Map();
  sort = null;
  filterOptions = {
    automaticRenew: [],
    status: []
  };
  baseUrl = environment.basePluginImagePath;

  constructor(private orderService: OrderService) {
    this.cols = [
      // {field: 'hash', header: 'ID'},
      {field: 'application.name', header: 'Stránka', sort: false},
      {field: 'products', header: 'Popis', sort: false},
      {field: 'price.amount', header: 'Cena', sort: true},
      {field: 'status', header: 'Stav', sort: true},
      {field: 'createdAt', header: 'Vytvořeno', sort: true},
    ];
    this.filterOptions.status = [
      {name: 'Vše', value: null},
      {name: 'Nezaplaceno', value: 0},
      {name: 'Zaplaceno', value: 1},
    ];
  }

  reloadData() {
    this.callService(this.page.page, this.prepareQuery(), this.sort);
  }

  loadLazy(event: LazyLoadEvent) {
    if (event.sortField) {
      this.sort = `${event.sortField},${event.sortOrder > 0 ? 'asc' : 'desc'}`;
    }

    const page = event ? (event.rows > 0 ? event.first / event.rows : 0) : this.page.page;
    this.callService(page, this.prepareQuery(), this.sort);
  }

  private callService(page: number, filter: string, orderBy: string) {
    this.orderService.getUserOrders(page, filter, orderBy).subscribe((ipage: IPageOrder) => {
      this.page = ipage;
      console.log(this.page.content);
    });
  }

  addFilter(value: string, field: string) {
    if (value) {
      if (typeof (value) === 'object') {
        value = value['value'];
        if (value !== null) {
          this.filter.set(field, value);
        } else {
          this.filter.delete(field);
        }
      } else {
        this.filter.set(field, value);
      }
    } else {
      this.filter.delete(field);
    }

    this.callService(0, this.prepareQuery(), '');
  }

  prepareQuery(): string {
    const queryArray = [];
    this.filter.forEach((k, v) => queryArray.push(`${v}=${k}`));
    return queryArray.join('&');
  }

  test(products: IProduct[]) {
    const results = [];
    const types = products.map(item => item.type).filter((value, index, self) => self.indexOf(value) === index);
    types.forEach(type => {
      results.push(`${products.filter(it => it.type === type).length}x ${type === ProductType.DONATION ? 'Dar' : (type === ProductType.SUBSCRIPTION ? 'Předplatné' : 'Placený obsah')}`);
    });
    return results.join(', ');
  }
}
