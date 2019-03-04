import { Component } from '@angular/core';
import {OrderService} from '../../../../shared/service/order.service';
import {LazyLoadEvent} from 'primeng/api';
import {IPageInvoice} from '../../../../shared/model/page/i-page-invoice';
import * as moment from 'moment';
import * as DateNames from 'date-names/cs';

@Component({
  selector: 'pv-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent {

  page: IPageInvoice = {
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
    period: [],
  };
  months = DateNames.months.map(month => month.charAt(0).toUpperCase() + month.slice(1));
  period;

  constructor(private orderService: OrderService) {
    this.cols = [
      {field: 'period', header: 'Období'},
      {field: 'appId', header: 'Stránka'},
      {field: 'price', header: 'Cena'},
      {field: 'commission', header: 'Provize'},
      // {field: 'client', header: 'Klient'},
    ];
    this.filterOptions.period = [
      {name: 'Vše', value: null},
    ];

    this.period = this.filterOptions.period[0];

    const start = moment('2019-01-01');
    const end = moment();
    for (const tmp = moment(start); tmp.isSameOrBefore(end); tmp.add(1, 'months')) {
      this.filterOptions.period.push({name: `${this.months[+tmp.format('M') - 1]} ${tmp.format('YYYY')}`, value: tmp.format('YYYY-MM')});
    }

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

  callService(page: number, filter: string, orderBy: string) {
    this.orderService.getInvoices(page, filter, orderBy).subscribe((ipage: IPageInvoice) => {
      this.page = ipage;
      console.log(this.page);
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
