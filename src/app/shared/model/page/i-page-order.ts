import {IPage} from '../i-page';
import {IOrder} from '../base/i-order';

export interface IPageOrder extends IPage {

  content: Array<IOrder>[];
}
