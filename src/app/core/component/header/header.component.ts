import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from '../../../shared/service/layout.service';
import {AuthenticationService} from '../../../shared/service/authentication.service';
import {User} from '../../../shared/model/user';
import {Router} from '@angular/router';
import {AlertService} from '../../../shared/service/alert.service';

@Component({
  selector: 'pv-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('nav') nav: ElementRef;
  public user: User;
  public fixedHeader: boolean;
  public isOnTop = false;
  private scrollOffset = null;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private layoutService: LayoutService) {
    this.layoutService.fixedHeader.subscribe((status: boolean) => this.fixedHeader = status);
  }

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((user: User) => this.user = user);
  }

  ngAfterViewInit() {
    this.scrollOffset = this.nav.nativeElement.offsetHeight;
  }

  onWindowScroll($event) {
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    this.isOnTop = verticalOffset >= this.scrollOffset;
  }

  logout(): void {
    this.authenticationService.logout().subscribe(() => {
        this.router.navigateByUrl('/uzivatel/prihlaseni').then(value => this.alertService.info('Odhlášení proběhlo úspěšně.'));
      },
      error => {
        console.log(error);
      });
    this.router.navigateByUrl('/uzivatel/prihlaseni');
  }
}
