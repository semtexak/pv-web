import {Component, OnInit} from '@angular/core';
import {IPageSubscription} from '../../../../shared/model/page/i-page-subscription';
import {SubscriptionService} from '../../../../shared/service/subscription.service';
import {LazyLoadEvent} from 'primeng/api';
import {User} from '../../../../shared/model/user';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'pv-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {

  page: IPageSubscription = {
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
  user: User;
  baseUrl = environment.basePluginImagePath;

  constructor(private authenticationService: AuthenticationService,
              private subscriptionService: SubscriptionService) {
    this.cols = [
      {field: 'appId', header: 'Stránka', sort: false},
      {field: 'lastSubscription.validTo', header: 'Platnost do', sort: true},
      {field: 'automaticRenew', header: 'Obnovování', sort: true},
      {field: 'status', header: 'Stav', sort: true},
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

  ngOnInit(): void {
    this.authenticationService.loggedUser.subscribe((user: User) => this.user = user);
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
    this.subscriptionService.getUserSubscriptions(page, filter, orderBy).subscribe((ipage: IPageSubscription) => {
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

}
