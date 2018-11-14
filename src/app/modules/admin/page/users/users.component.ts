import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../shared/service/user.service';
import {TableService} from '../../service/table.service';
import {IUser} from '../../../../shared/model/i-user';
import {IPage} from '../../../../shared/model/i-page';

@Component({
  selector: 'pv-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: IUser[];
  page: IPage;
  columns = [
    {field: 'id', header: 'ID'}
  ];

  constructor(private userService: UserService,
              private tableService: TableService) {
    this.tableService.page$.subscribe((page: IPage) => this.page = page);
  }

  ngOnInit() {
  }

}
