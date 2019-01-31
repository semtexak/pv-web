import {Price} from './price';

export interface IOrder {
  id: number;
  hash: string;
  status: Status;
  price: Price;
  products: IProduct[];
  createdAt: number;
}

export enum Status {
  NEW = 'NEW',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'

}

export interface IProduct {
  name: string;
  quantity: number;
  price: Price;
  type: ProductType;
}


export enum ProductType {
  // DONATION = 'donation',
  // SUBSCRIPTION = 'subscription',
  // PAID_CONTENT = 'paid-content'
  NONE = 0,
  DONATION = 1,
  SUBSCRIPTION = 2,
  PAID_CONTENT = 3
}
