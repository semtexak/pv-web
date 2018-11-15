import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../shared/service/user.service';
import {TableService} from '../../service/table.service';
import {IUser} from '../../../../shared/model/i-user';
import {IPage} from '../../../../shared/model/i-page';
import {LazyLoadEvent} from '../../../../../../node_modules/primeng/api';

@Component({
  selector: 'pv-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  page: IPage = {
    content: [],
    page: 0,
    empty: true,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };
  cols = [
    {field: 'id', header: 'ID'},
    {field: 'email', header: 'E-mail'},
  ];
  filter: Map<string, any> = new Map();

  constructor(private userService: UserService,
              private tableService: TableService) {
    // this.tableService.page$.subscribe((page: IPage) => this.page = page);
  }

  ngOnInit() {
  }

  loadLazy(event: LazyLoadEvent) {
    console.log(event);

    const page = event ? (event.rows > 0 ? event.first / event.rows : 0) : this.page.page;
    this.callService(page, '', '');
  }

  private callService(page: number, filter: string, orderBy: string) {
    this.userService.getUsers(page, filter, orderBy).subscribe((ipage: IPage) => {
      console.log(ipage);
      this.page = ipage;
    });
  }

  addFilter(value: string, field: string) {
    if (value) {
      this.filter.set(field, value);
    } else {
      this.filter.delete(field);
    }
  }
}
