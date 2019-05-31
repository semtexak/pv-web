import {IApplication} from './i-application';
import {IPrice} from './statistics/i-statistics';
import {Price} from './price';

export interface IDonation {

  id: number;
  email: string;
  active: boolean;
  createdAt: number;
  roles: Role[];
  application: IApplication;
  childrens: IDonation[];
  price: Price;
  order: number;
  status: Status;
  recurrent: boolean;
}

export enum Role {

  USER = 'USER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum Status {

  NEW = 'NEW'

}
