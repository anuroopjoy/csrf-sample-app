import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #headerName = 'Authorization';
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !request.headers.has(this.#headerName)) {
      request = request.clone({
        headers: request.headers.set(this.#headerName, `Bearer ${token}`),
      });
    }
    return next.handle(request);
  }
}
