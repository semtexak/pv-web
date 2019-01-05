export interface IClient {

  id: number;
  details: IClientDetails;
  createdAt: number;

}

export interface IClientDetails {
  company: string;
  dic: string;
  ico: number;
}

export enum Role {

  USER = 'USER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',

}
