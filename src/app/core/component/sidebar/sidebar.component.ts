import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/model/user';
import {AuthenticationService} from '../../../shared/service/authentication.service';

@Component({
  selector: 'pv-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((user: User) => {
      this.user = user;
    });
  }

}
