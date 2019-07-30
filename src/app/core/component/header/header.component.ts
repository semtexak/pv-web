import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  @ViewChild('nav', { static: true }) nav: ElementRef;
  public user: User;
  public shake = false;
  public notifications: INotification[] = [];
  public notificationsPreview: INotification[] = [];
  public fixedHeader: boolean;
  public sidebarMinimized: boolean;
  public isOnTop = false;
  public notificationsCount: number;
  private scrollOffset = null;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private alertService: AlertService,
              private router: Router,
              private renderer: Renderer2,
              private layoutService: LayoutService) {
    this.layoutService.fixedHeader.subscribe((status: boolean) => this.fixedHeader = status);
    this.layoutService.sidebarMinimized.subscribe((status: boolean) => this.sidebarMinimized = status);
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.notificationsPreview = notifications;
      this.notificationsCount = this.notificationsPreview.filter((notification: INotification) => !notification.acknowledged).length;
      console.log(this.notificationsCount);
    });
  }

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((user: User) => {
      this.user = user;
      if (user && this.adminSection) {
        // this.notificationService.connect();
      } else {
        // this.notificationService.disconnect();
      }
    });
  }

  ngAfterViewInit() {
    this.scrollOffset = this.nav.nativeElement.offsetHeight;
  }

  testReload() {
    this.authenticationService.reloadUserData().subscribe();
  }

  toggleSidebar() {
    this.layoutService.sidebarMinimized.next(!this.layoutService.sidebarMinimized.getValue());
    if (this.layoutService.sidebarMinimized.getValue()) {
      this.renderer.addClass(document.body, 's-h');
      this.renderer.removeClass(document.body, 's-o');
    } else {
      this.renderer.addClass(document.body, 's-o');
      this.renderer.removeClass(document.body, 's-h');
    }
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
