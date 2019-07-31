import {Component, OnInit, Renderer2} from '@angular/core';
import {User} from '../../../shared/model/user';
import {AuthenticationService} from '../../../shared/service/authentication.service';
import {LayoutService} from '../../../shared/service/layout.service';

@Component({
  selector: 'pv-sidebar',
  templateUrl: './mat-sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  isHidden: boolean = false;
  user: User;

  constructor(private authenticationService: AuthenticationService,
              private layoutService: LayoutService,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((user: User) => {
      this.user = user;
    });
    this.layoutService.sidebarMinimized.subscribe(status => {
      this.isHidden = status;
      if (this.isHidden) {
        this.renderer.addClass(document.body, 's-h');
        this.renderer.removeClass(document.body, 's-o');
      } else {
        this.renderer.addClass(document.body, 's-o');
        this.renderer.removeClass(document.body, 's-h');
      }
    });
  }

  toggleSidebar() {
    this.layoutService.sidebarMinimized.next(!this.isHidden);
    if (this.isHidden) {
      this.renderer.addClass(document.body, 's-h');
      this.renderer.removeClass(document.body, 's-o');
    } else {
      this.renderer.addClass(document.body, 's-o');
      this.renderer.removeClass(document.body, 's-h');
    }
  }
}
