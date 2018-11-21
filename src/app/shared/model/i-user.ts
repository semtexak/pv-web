export interface IUser {

  id: number;
  email: string;
  active: boolean;
  createdAt: number;
  roles: Role[];

}

export enum Role {

  USER = 'USER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',

}
