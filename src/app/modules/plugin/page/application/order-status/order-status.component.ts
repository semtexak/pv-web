import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../../../shared/service/order.service';
import {IOrder, Status} from '../../../../../shared/model/base/i-order';
import {ApplicationContextService} from '../../../service/application-context.service';

@Component({
  selector: 'pv-order-status',
  templateUrl: './order-status.component.html'
})
export class OrderStatusComponent implements OnInit {
  orderHash: string;
  order: IOrder;
  OrderStatus = Status;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private applicationContext: ApplicationContextService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderHash = params['order'];
      if (this.orderHash) {
        this.orderService.getOrderStatus(this.orderHash).subscribe((order: IOrder) => {
          console.log(order);
          this.order = order;
          this.applicationContext.order.next(order);
        });
      }
    });
  }

  /** TODO remove */
  testUpdateOrderStatus(status: string) {
    this.orderService.testUpdateOrderStatus(this.order.hash, status).subscribe(response => console.log(response));
  }

}
