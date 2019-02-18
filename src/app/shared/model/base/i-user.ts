export interface IUser {

  id: number;
  email: string;
  active: boolean;
  createdAt: number;
  details: IUserDetails;
  roles: Role[];

}

export enum Role {

  USER = 'USER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',

}

export interface IUserDetails {
  firstName: string;
  lastName: string;
  sex: Sex;
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
