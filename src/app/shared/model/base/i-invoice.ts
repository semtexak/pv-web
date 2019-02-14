import {Price} from './price';

export interface IInvoice {
  id: number;
  appId: string;
  client: number;
  invoiceLink: string;
  price: Price;
  commission: Price;
  createdAt: number;
}
