import {IApplication} from './base/i-application';

export class User {

  id: number;
  email: String;
  name: String;
  authorities: IAuthority[];
  applications: IApplication[] = [];

  constructor(id?: number, email?: String, name?: String, authorities?: IAuthority[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.authorities = authorities;
  }

  hasRole(role: string) {
    return this.authorities.findIndex(it => it.authority === role) !== -1;
  }
}

export interface IAuthority {
  authority: string;
}
