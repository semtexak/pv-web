import { Component, OnInit } from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';
import {ClientService} from '../../../../shared/service/client.service';
import {IPageClient} from '../../../../shared/model/page/i-page-client';
import {Service} from '../../../../shared/model/base/i-application';

@Component({
  selector: 'pv-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  Service: typeof Service = Service;
  page: IPageClient = {
    content: [],
    page: 0,
    empty: true,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };
  cols = [
    {field: 'details.company', header: 'Subjekt'},
    {field: 'details.contactPerson.lastName', header: 'Kontaktní osoba'},
    {field: 'details.contactPerson.email', header: 'Kontaktní email'},
    {field: 'details.applications', header: 'Počet stránek'},
    {field: 'user', header: 'Správce'},
    {field: 'createdAt', header: 'Založeno'},
  ];
  filter: Map<string, any> = new Map();
  roles = null;
  active = null;
  banned = null;
  sort: string = null;
  filterOptions = {
    roles: [],
    active: [],
    banned: []
  };

  constructor(private clientService: ClientService) {
    this.filterOptions.roles = [
      {name: 'Vše', value: null},
      // {name: 'Uživatel', value: 'USER'},
      {name: 'Klient', value: 'CLIENT'},
      {name: 'Administrátor', value: 'ADMIN'}
    ];
    this.filterOptions.active = [
      {name: 'Vše', value: null},
      {name: 'Aktivní', value: true},
      {name: 'Neaktivní', value: false}
    ];
    this.filterOptions.banned = [
      {name: 'Vše', value: null},
      {name: 'Povolen', value: false},
      {name: 'Zakázán', value: true}
    ];
  }

  ngOnInit() {
  }

  loadLazy(event: LazyLoadEvent) {
    if (event.sortField) {
      this.sort = `${event.sortField},${event.sortOrder > 0 ? 'asc' : 'desc'}`;
    }

    const page = event ? (event.rows > 0 ? event.first / event.rows : 0) : this.page.page;
    this.callService(page, this.prepareQuery(), this.sort);
  }

  private callService(page: number, filter: string, orderBy: string) {
    this.clientService.getClients(page, filter, orderBy).subscribe((ipage: IPageClient) => {
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
