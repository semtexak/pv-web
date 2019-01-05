import { Component } from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';
import {ClientService} from '../../../../shared/service/client.service';
import {IPageApplication} from '../../../../shared/model/page/i-page-application';
import {IApplication, Service} from '../../../../shared/model/base/i-application';

@Component({
  selector: 'pv-clients',
  templateUrl: './applications.component.html'
})
export class ApplicationsComponent {

  Service: typeof Service = Service;
  page: IPageApplication = {
    content: [],
    page: 0,
    empty: true,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };
  cols = [
    {field: 'domain', header: 'Doména'},
    {field: 'appId', header: 'APP ID'},
    {field: 'active', header: 'Stav'},
    {field: 'client.details.company', header: 'Klient'},
    {field: 'configurations', header: 'Služby'},
    {field: 'createdAt', header: 'Vytvořeno'},
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

  loadLazy(event: LazyLoadEvent) {
    if (event.sortField) {
      this.sort = `${event.sortField},${event.sortOrder > 0 ? 'asc' : 'desc'}`;
    }

    const page = event ? (event.rows > 0 ? event.first / event.rows : 0) : this.page.page;
    this.callService(page, this.prepareQuery(), this.sort);
  }

  private callService(page: number, filter: string, orderBy: string) {
    this.clientService.getApplications(page, filter, orderBy).subscribe((ipage: IPageApplication) => {
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

  hasService(application: IApplication, service: Service) {
    return application.configurations.filter((item) => item.type === service).length > 0;
  }
}
