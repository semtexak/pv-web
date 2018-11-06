export class LoginStatus {

  logged: boolean
  error: string[];


  constructor(logged: boolean, error: string[] = []) {
    this.logged = logged;
    this.error = error;
  }
}
