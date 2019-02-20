import {Component, Input, OnInit} from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';
import {IPageInvoice} from '../../model/page/i-page-invoice';

@Component({
  selector: 'pv-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input() columns = [];
  @Input() filterOptions = [];
  @Input() serviceCall: Function;
  page: IPageInvoice = {
    content: [],
    page: 0,
    empty: true,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };
  filter: Map<string, any> = new Map();
  sort = null;

  constructor() {
  }

  ngOnInit() {
  }

  loadLazy(event: LazyLoadEvent) {
    if (event.sortField) {
      this.sort = `${event.sortField},${event.sortOrder > 0 ? 'asc' : 'desc'}`;
    }

    const page = event ? (event.rows > 0 ? event.first / event.rows : 0) : this.page.page;
    this.serviceCall(page, this.prepareQuery(), this.sort);
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

    this.serviceCall(0, this.prepareQuery(), '');
  }

  prepareQuery(): string {
    const queryArray = [];
    this.filter.forEach((k, v) => queryArray.push(`${v}=${k}`));
    return queryArray.join('&');
  }

}
