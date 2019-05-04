import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserService} from '../../../../shared/service/user.service';
import {Observable, of, Subscription} from 'rxjs';
import {AuthService} from 'angularx-social-login';
import {HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {IToken} from '../../../../shared/model/i-token';
import {environment} from '../../../../../environments/environment.prod';

@Component({
  selector: 'pv-user-activation',
  templateUrl: './user-activation.component.html'
})
export class UserActivationComponent implements OnInit, OnDestroy {

  activationSuccess: boolean;
  private sub: Subscription;
  autoLoginOnActivation = environment.autoLoginOnActivation;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      map(params => params.activationKey),
      switchMap(activationKey => {
        return this.userService.activateUser(activationKey).pipe(
          switchMap((token: IToken) => {
            if (this.autoLoginOnActivation) {
              this.authenticationService.saveToken(token);
              return this.authenticationService.saveUser().pipe(
                map(() => true),
                catchError(err => of(false))
              );
            }
            return of(true);
          })
        );
      }),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    ).subscribe(status => {
      this.activationSuccess = status;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
