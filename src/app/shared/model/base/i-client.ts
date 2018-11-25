export interface IClient {

  appId: string;
  domain: string;
  name: string;
  active: boolean;
  createdAt: number;

}

export enum Role {

  USER = 'USER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',

}
