export class User {

  id: number;
  email: String;
  name: String;
  authorities: string[];

  constructor(id?: number, email?: String, name?: String, authorities?: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.authorities = authorities;
  }
}
