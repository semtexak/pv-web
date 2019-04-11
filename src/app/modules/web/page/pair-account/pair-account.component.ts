import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../shared/service/user.service';
import {from} from 'rxjs';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'pv-pair-account',
  templateUrl: './pair-account.component.html'
})
export class PairAccountComponent implements OnInit {

  private token: any;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.p;
      console.log(this.token);
      const obs = from(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
      obs.subscribe((response: SocialUser) => {
        this.userService.pairAccount(this.token, response.authToken).subscribe(response => console.log(response));
      });
    });
  }

}
