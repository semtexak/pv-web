import { Component } from '@angular/core';
import {IPageDonation} from '../../../../shared/model/page/i-page-donation';
import {DonationService} from '../../../../shared/service/donation.service';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'pv-donations',
  templateUrl: './donations.component.html'
})
export class DonationsComponent {

  page: IPageDonation = {
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

  constructor(private donationService: DonationService) {
    this.cols = [
      {field: 'appId', header: 'Stránka', sort: false},
      {field: 'price', header: 'Cena', sort: true},
      {field: 'comment', header: 'Pravidelná', sort: false},
      {field: 'createdAt', header: 'Datum', sort: true},
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
    this.donationService.getUserDonations(page, filter, orderBy).subscribe((ipage: IPageDonation) => {
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

