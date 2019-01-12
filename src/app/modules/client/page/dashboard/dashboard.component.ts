import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../shared/service/application.service';
import {IApplicationStatistics} from '../../../../shared/model/base/statistics/i-application-statistics';
import {IStatistics} from '../../../../shared/model/base/statistics/i-statistics';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'pv-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  statisticPeriod = this.switchPeriod('curmonth');
  statistics: IApplicationStatistics;

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['appId']) {
        this.applicationService.getApplicationStatistics(params['appId'], this.statisticPeriod.from, this.statisticPeriod.to).subscribe((statistics: IApplicationStatistics) => {
          this.statistics = statistics;
          this.calculateStatistics(statistics);
          console.log(statistics.statistics);
        });
      }
    });
  }
  
  calculateStatistics(statistics: IApplicationStatistics) {
    let tmp: IStatistics = {
      price: {
        amount: 0,
        currency: 'CZK'
      },
      averagePrice: {
        amount: 0,
        currency: 'CZK'
      },
      sales: 0,
      uniqueSales: 0
    };
    for (let type of Object.keys(statistics.statistics)) {
      if (statistics.statistics[type]) {
        tmp.sales += statistics.statistics[type].sales;
        tmp.price.amount += statistics.statistics[type].price.amount;
      }
    }

    if (Object.keys(statistics.statistics).length > 0 && tmp.sales > 0) {
      tmp.averagePrice.amount = tmp.price.amount / tmp.sales;
    }

    statistics.total = tmp;
    this.statistics = statistics;
  }

  switchPeriod(type: string) {
    let date, year, month, day, from, to;
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();

    switch (type) {
      case 'today':
        from = new Date(year, month, day);
        to = new Date(year, month, day);
        to.setHours(23, 59, 59);
        break;
      case 'curmonth':
        from = new Date(year, month, 1);
        to = new Date(year, month + 1, 0);
        to.setHours(23, 59, 59);
        break;
      case 'curyear':
        from = new Date(year, 0, 1);
        to = new Date(year, 11 + 1, 0);
        to.setHours(23, 59, 59);
        break;
    }
    return {from: this.datePipe.transform(from, 'yyyy-MM-dd HH:mm:ss'), to: this.datePipe.transform(to, 'yyyy-MM-dd HH:mm:ss')};
  }

}
