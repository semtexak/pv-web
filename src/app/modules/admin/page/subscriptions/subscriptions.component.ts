import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../../shared/service/subscription.service';
import {LazyLoadEvent} from 'primeng/api';
import {ISubscription} from '../../../../shared/model/i-subscription';

@Component({
  selector: 'pv-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {

  public subscriptions: ISubscription[];
  public subscriptionData = {
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };
  public cols = [];
  automaticRenewOptions = [
    {
      id: -1, name: 'Vše'
    },
    {
      id: 1, name: 'Ano'
    },
    {
      id: 0, name: 'Ne'
    }
  ];
  statusOptions = [
    {
      id: -1, name: 'Vše'
    },
    {
      id: 1, name: 'Aktivní'
    },
    {
      id: 0, name: 'Neaktivní'
    }
  ];
  filtersURL = '';
  orderBy = null;
  private filters = [];
  automaticRenew = -1;
  status = -1;

  constructor(private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'plan.appId', header: 'Stránka'},
      {field: 'account.email', header: 'E-mail'},
      {field: 'period', header: 'Perioda'},
      {field: 'automaticRenew', header: 'Obnovování'},
      {field: 'status', header: 'Stav'},
    ];

  }

  loadLazy(event: LazyLoadEvent) {
    console.log(event);

    if (event) {
      this.orderBy = event.sortField;

      if (this.orderBy) {
        if (event.sortOrder > 0) {
          this.orderBy += ',asc';
        } else {
          this.orderBy += ',desc';
        }
      } else {
        this.orderBy = '';
      }
    }
    console.log(this.orderBy);


    const page = event ? (event.rows > 0 ? event.first / event.rows : 0) : this.subscriptionData.page;
    this.callService(page, this.filtersURL !== '' ? this.filtersURL : null, this.orderBy);
  }

  filter(val: any, field: any = null) {
    if (field) {
      val = this.prepareVal(val, field);

      this.transformFilters(false);

      const filterField = this.filters.find(x => x[0] === field);
      if (filterField) {
        filterField[1] = val;
      } else {
        this.filters.push([field, val]);
      }

      this.transformFilters();
      this.callService(0, this.filtersURL);
    }
  }

  private callService(page: number = 0, filter: string = null, orderBy: string = null) {
    this.subscriptionService.getSubscriptions(page, filter, orderBy).subscribe(
      (subscriptionsPage) => {
        console.log(subscriptionsPage);
        this.subscriptionData.size = subscriptionsPage.size;
        this.subscriptionData.totalElements = subscriptionsPage.totalElements;
        this.subscriptions = subscriptionsPage.content;
      }
    );
  }

  private transformFilters(toURL = true) {
    if (toURL) {
      this.filtersURL = '';
      const tmp = [];
      for (const part of this.filters) {
        tmp.push(part.join('='));
      }
      this.filtersURL = tmp.join('&');
    } else {
      this.filters = [];
      const parts = this.filtersURL.split('&');
      for (const part of parts) {
        this.filters.push(part.split('='));
      }
    }
  }

  filterSelect(event: any, field: any = null) {
    if (field) {
      if (event) {
        this.filter(event.id, field);
      } else {
        this.filterClearSelect(event, field);
      }
    }
  }

  filterClearSelect(event: any, field: any = null) {
    this.automaticRenew = -1;
    this.filter(this.automaticRenew, field);
  }

  private prepareVal(val: any, field: any) {
    if (field === 'automaticRenew' && val === -1) {
      return undefined;
    }

    return val;
  }

  deleteSubscription(subscription) {
    console.log(subscription.id);
    // this.subscriptionService.deleteSubscription(subscription.id).then(
    //   (data) => {
    //     this.loadLazy(null);
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
