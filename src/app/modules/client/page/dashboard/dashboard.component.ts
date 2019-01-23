import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../shared/service/application.service';
import {IApplicationStatistics} from '../../../../shared/model/base/statistics/i-application-statistics';
import {IStatistics} from '../../../../shared/model/base/statistics/i-statistics';
import {DatePipe} from '@angular/common';
import {Chart} from 'chart.js';
import * as moment from 'moment';

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
    const yData = this.prepareChartData(xData, statistics.statistics);

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: [
          {
            data: yData.donation,
            label: 'Příspěvky',
            borderWidth: 1,
            backgroundColor: '#1cb4ff20',
            borderColor: '#1cb4ff',
            fill: true,
          },
          {
            data: yData.subscription,
            label: 'Předplatné',
            borderWidth: 1,
            backgroundColor: '#F5B04120',
            borderColor: '#F5B041',
            fill: true,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(24, 28, 33, 0.06)'
            },
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD HH:mm:ss',
              unit: 'day',
              displayFormats: {
                day: 'DD.'
              },
              min: '2019-01-01 18:43:53',
              max: '2019-01-31 18:43:53'
            },
            ticks: {
              source: 'data',
              fontColor: '#b0b0b0',
              padding: 10,
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(24, 28, 33, 0.06)'
            },
            ticks: {
              fontColor: '#b0b0b0',
              autoSkip: false,
              maxTicksLimit: 5,
              padding: 15,
              beginAtZero: true,
              callback: (label, index, labels) => {
                return `${label} Kč`;
              }
            }
          }]
        },
        legend: {
          display: true,
        }
      },
      plugins: [{
        beforeInit: function (chart) {
          const time = chart.options.scales.xAxes[0].time,
            timeDiff = moment(time.max).diff(moment(time.min), 'd');
          for (let i = 0; i <= timeDiff; i++) {
            const label = moment(time.min).add(i, 'd').format('YYYY-MM-DD HH:mm:ss');
            chart.data.labels.push(label);
          }
        }
      }]
    });
  }

  switchPeriod(type: string) {
    let date, year, month, day, start, end;
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();


    switch (type) {
      case 'today':
        start = new Date(year, month, day);
        end = new Date(year, month, day);
        end.setHours(23, 59, 59);
        break;
      case 'curmonth':
        start = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        end = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'curyear':
        start = new Date(year, 0, 1);
        end = new Date(year, 11 + 1, 0);
        end.setHours(23, 59, 59);
        break;
    }
    return {from: start, to: end};
  }

  private getRange(from: string, to: string): string[] {
    const startDate = moment(from);
    const endDate = moment(to);
    const diffInDays = endDate.diff(startDate, 'days');
    const result = [];

    for (let i = 0; i <= diffInDays; i++) {
      result.push(moment(startDate).add(i, 'd').format('YYYY-MM-DD'));
    }
    return result;
  }

  private prepareChartData(dates: string[], statistics) {
    const donationData = [];
    const subscriptionData = [];

    for (const date of dates) {
      if (statistics['donate']) {
        const totalDonationPrice = statistics['donate'].data.filter(item => moment(item.createdAt).isSame(moment(date), 'days'))
          .map(item => item.price.amount).reduce((a, b) => a + b, 0);
        donationData.push(totalDonationPrice);
      }
      if (statistics['subscription']) {
        const totalSubscriptionPrice = statistics['subscription'].data.filter(item => moment(item.createdAt).isSame(moment(date), 'days'))
          .map(item => item.price.amount).reduce((a, b) => a + b, 0);
        subscriptionData.push(totalSubscriptionPrice);
      }
    }
    return {donation: donationData, subscription: subscriptionData};
  }
}
