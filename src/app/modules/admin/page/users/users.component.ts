import {Component} from '@angular/core';
import {UserService} from '../../../../shared/service/user.service';
import {LazyLoadEvent} from 'primeng/api';
import {IPageUser} from '../../../../shared/model/page/i-page-user';
import {IUser, Role, Sex} from '../../../../shared/model/base/i-user';

@Component({
  selector: 'pv-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {

  Role: typeof Role = Role;
  Sex: typeof Sex = Sex;
  page: IPageUser = {
    content: [],
    page: 0,
    empty: true,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };
  cols = [
    {field: 'email', header: 'E-mail'},
    {field: 'details.lastName', header: 'Jméno'},
    {field: 'active', header: 'Stav'},
    {field: 'banned', header: 'Přístup'},
    {field: 'roles', header: 'Oprávnění'},
    {field: 'createdAt', header: 'Registrace'},
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

  constructor(private userService: UserService) {
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
    this.userService.getUsers(page, filter, orderBy).subscribe((ipage: IPageUser) => {
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

  hasRole(user: IUser, role: Role): boolean {
    return user.roles.includes(role);
  }
}
