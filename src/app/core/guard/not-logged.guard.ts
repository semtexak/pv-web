import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {User} from '../../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
  private isLoggedIn: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.authenticationService.loggedUser.subscribe((user: User) => this.isLoggedIn = !!user);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLoggedIn) {
      console.log('Logged, but should be.');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
