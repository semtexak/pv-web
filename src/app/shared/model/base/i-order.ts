export interface IOrder {
  hash: string;
  status: Status;
  price: Price;
  products: Product[];
}

export enum Status {
  NEW = 'NEW',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'

}

export interface Product {
  name: string;
  price: Price;
}

export interface Price {
  amount: number;
  currency: string;
}
