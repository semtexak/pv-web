import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.injectToken(request, this.authenticationService.getToken()));
  }

  injectToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    // console.log(request.url);
    if ((request.url.includes('/register') && token === undefined) || token === '' || token === 'undefined' || token === undefined) {
      return request;
    }
    return request.clone({setHeaders: {Authorization: 'Bearer ' + token}});
  }
}
