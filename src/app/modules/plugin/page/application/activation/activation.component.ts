import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, of, Subscription, timer} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../../../../../shared/service/authentication.service';

@Component({
  selector: 'pv-activation',
  templateUrl: './activation.component.html'
})
export class ActivationComponent implements OnInit, OnDestroy {

  private timerDelay = 5000;
  private sub: Subscription;


  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.sub = timer(this.timerDelay, this.timerDelay).pipe(
      switchMap(() => this.authenticationService.reloadUserData().pipe(
        catchError(err => of(err))
      ))
    ).subscribe(response => console.log(response));

  }

  reloadUserData() {
    this.authenticationService.reloadUserData().subscribe();
  }

  ngOnDestroy(): void {
    console.log('Destroying');
    this.sub.unsubscribe();
  }
}
