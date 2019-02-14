import {IPage} from './i-page';
import {IInvoice} from '../base/i-invoice';

export interface IPageInvoice extends IPage {

  content: Array<IInvoice>[];
}
