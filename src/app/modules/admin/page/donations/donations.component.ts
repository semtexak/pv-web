import { Component, OnInit } from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';
import {IPageDonation} from '../../../../shared/model/page/i-page-donation';
import {DonationService} from '../../../../shared/service/donation.service';

@Component({
  selector: 'pv-orders',
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
  filterOptions = {
    automaticRenew: [],
    status: []
  };

  constructor(private donationService: DonationService) {
    this.cols = [
      {field: 'hash', header: 'ID'},
      {field: 'appId', header: 'Stránka'},
      {field: 'user', header: 'Uživatel'},
      {field: 'lastSubscription.validTo', header: 'Platnost do'},
      {field: 'automaticRenew', header: 'Obnovování'},
      {field: 'status', header: 'Stav'},
    ];
    this.filterOptions.automaticRenew = [
      {name: 'Vše', value: null},
      {name: 'Ano', value: true},
      {name: 'Ne', value: false}
    ];
    this.filterOptions.status = [
      {name: 'Vše', value: null},
      {name: 'Nový', value: 0},
      {name: 'Neaktivní', value: 1},
      {name: 'Pozastaveno', value: 2},
      {name: 'Aktivní', value: 3},
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
    this.donationService.getDonations(page, filter, orderBy).subscribe((ipage: IPageDonation) => {
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
