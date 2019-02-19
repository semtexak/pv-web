import { Component, OnInit } from '@angular/core';
import {IPageOrder} from '../../../shared/model/page/i-page-order';
import {OrderService} from '../../../shared/service/order.service';
import {LazyLoadEvent} from 'primeng/api';
import {Service} from '../../../shared/model/base/i-application';

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

  constructor(private orderService: OrderService) {
    this.cols = [
      {field: 'hash', header: 'ID'},
      {field: 'appId', header: 'Stránka'},
      {field: 'price.amount', header: 'Cena'},
      {field: 'createdAt', header: 'Vytvořeno'},
      {field: 'status', header: 'Stav'},
    ];
    this.filterOptions.status = [
      {name: 'Vše', value: null},
      {name: 'Nezaplaceno', value: 0},
      {name: 'Zaplaceno', value: 1},
    ];
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
      if (typeof(value) === 'object') {
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

}
