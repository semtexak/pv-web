import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../shared/service/application.service';
import {IApplicationStatistics} from '../../../../shared/model/base/statistics/i-application-statistics';
import {IStatistics} from '../../../../shared/model/base/statistics/i-statistics';
import {DatePipe} from '@angular/common';
import {Chart} from 'chart.js';

@Component({
  selector: 'pv-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  statisticPeriod = this.switchPeriod('curmonth');
  statistics: IApplicationStatistics;
  chart = [];

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
    const tmp: IStatistics = {
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
    for (const type of Object.keys(statistics.statistics)) {
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

    const xData = this.getRange(this.statisticPeriod.from, this.statisticPeriod.to);
    const yData = this.prepareChartData(xData, statistics.statistics['donate'].data);
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: yData.map(d => d.t.toLocaleString()),
        datasets: [{
          label: 'Demo',
          data: yData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: {
            type: 'time',
            time: {
              displayFormats: {
                'millisecond': 'MMM DD',
                'second': 'MMM DD',
                'minute': 'MMM DD',
                'hour': 'MMM DD',
                'day': 'MMM DD',
                'week': 'MMM DD',
                'month': 'MMM DD',
                'quarter': 'MMM DD',
                'year': 'MMM DD',
              }
            }
          },
          yAxes: [{
            stacked: true,
          }]
        },
        animation: {
          duration: 750,
        },
      }
    });
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

  private getRange(from: string, to: string): Array<Date> {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const result = [];
    let current: Date = new Date(from);
    result.push(fromDate);
    while (current < toDate) {
      const tmp = new Date(current.setDate(current.getDate() + 1).valueOf());
      result.push(tmp);
      current = tmp;
    }
    console.log(result);
    return result;
  }

  private prepareChartData(dates: Array<Date>, data: Array<any>): Array<any> {
    const result = [];
    for (const item of data) {
      item.createdAt = new Date(item.createdAt);
      item.createdAt.setHours(0, 0, 0, 0);
    }
    for (const date of dates) {
      const filteredData = data.filter(item => item.createdAt.valueOf() === date.valueOf()).map(item => item.price.amount);
      const totalPrice = filteredData.reduce((a, b) => a + b, 0);
      result.push({
        t: date,
        y: totalPrice
      });
    }
    console.log(result);
    return result;
  }
}
