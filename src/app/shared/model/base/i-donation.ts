import {IApplication} from './i-application';

export interface IDonation {

  id: number;
  email: string;
  active: boolean;
  createdAt: number;
  roles: Role[];
  application: IApplication;
}

export enum Role {

  USER = 'USER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',

}
