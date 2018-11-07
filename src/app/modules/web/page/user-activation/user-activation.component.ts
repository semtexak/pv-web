import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserService} from '../../../../shared/service/user.service';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'pv-user-activation',
  templateUrl: './user-activation.component.html'
})
export class UserActivationComponent implements OnInit, OnDestroy {

  activationSuccess: boolean;
  private sub: Subscription;


  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      map(params => params.activationKey),
      switchMap(activationKey => {
        console.log(`Activation key: ${activationKey}`);
        return this.userService.activateUser(activationKey).pipe(
          map(() => true)
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
