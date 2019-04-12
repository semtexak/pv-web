import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../../shared/service/order.service';
import { IOrder, Status } from '../../../../../shared/model/base/i-order';
import { ApplicationContextService } from '../../../service/application-context.service';
import {WindowService} from '../../../../../shared/service/window.service';
import {map, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'pv-order-status',
  templateUrl: './order-status.component.html'
})
export class OrderStatusComponent implements OnInit {
  orderHash: string;
  order: IOrder;
  OrderStatus = Status;

  constructor(private route: ActivatedRoute,
    private w: WindowService,
    private orderService: OrderService,
    private applicationContext: ApplicationContextService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderHash = params['order'];
      if (this.orderHash) {
        this.orderService.getOrderStatus(this.orderHash).pipe(switchMap((order: IOrder) => {
          this.order = order;
          this.applicationContext.order.next(order);
          return this.orderService.testUpdateOrderStatus(order.hash, 'PAID').pipe(
            switchMap((response: HttpResponse<any>) => {
              // if (response.status === 204) {
                return this.orderService.getOrderStatus(this.orderHash);
              // } else {
              //   throw
              // }
            })
          );
        })).subscribe((order: IOrder) => {
          this.order = order;
          this.applicationContext.order.next(order);
        });
      }
    });
  }

  /** TODO remove */
  testUpdateOrderStatus(status: string) {
    this.orderService.testUpdateOrderStatus(this.order.hash, status).subscribe(response => {
      if (response.status === 204) {
        this.orderService.getOrderStatus(this.orderHash).subscribe((order: IOrder) => {
          console.log(order);
          this.order = order;
          this.applicationContext.order.next(order);
        });
      }
    });
  }

  sendCloseMessage() {
    if (this.w.nativeWindow['parentIFrame']) {
      this.w.nativeWindow['parentIFrame'].sendMessage({action: 'close'});
    }
  }
}
