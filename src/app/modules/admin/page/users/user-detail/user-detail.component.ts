import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../shared/service/user.service';
import {IUser} from '../../../../../shared/model/base/i-user';

@Component({
  selector: 'pv-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  user: IUser;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.userService.getUser(id).subscribe((user: IUser) => {
          this.user = user;
          console.log(user);
        });
      }
    });
  }

}
