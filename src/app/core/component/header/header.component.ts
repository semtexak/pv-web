import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from '../../../shared/service/layout.service';
import {AuthenticationService} from '../../../shared/service/authentication.service';
import {User} from '../../../shared/model/user';
import {Router} from '@angular/router';
import {AlertService} from '../../../shared/service/alert.service';
import {NotificationService} from '../../../shared/service/notification.service';
import {INotification} from '../../../shared/model/base/i-notification';

@Component({
  selector: 'pv-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Input() adminSection = false;
  @ViewChild('nav') nav: ElementRef;
  public user: User;
  public shake = false;
  public notifications: INotification[] = [];
  public notificationsPreview: INotification[] = [];
  public fixedHeader: boolean;
  public isOnTop = false;
  private scrollOffset = null;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private alertService: AlertService,
              private router: Router,
              private layoutService: LayoutService) {
    this.layoutService.fixedHeader.subscribe((status: boolean) => this.fixedHeader = status);
    this.notificationService.notifications.subscribe(notifications => {
      this.notifications = notifications;
      this.notificationsPreview = notifications.slice(0, 10);
    });
  }

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((user: User) => {
      this.user = user;
      if (user && this.adminSection) {
        this.notificationService.connect();
      } else {
        this.notificationService.disconnect();
      }
    });
  }

  ngAfterViewInit() {
    this.scrollOffset = this.nav.nativeElement.offsetHeight;
  }

  shakeTest() {
    this.notificationService.sendTest();
    // setTimeout(() => { this.shake = false; }, 1000);
  }

  onWindowScroll($event) {
    if (this.fixedHeader) {
      const verticalOffset = window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0;
      this.isOnTop = verticalOffset >= this.scrollOffset;
    }
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
